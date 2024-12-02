import subprocess
import sys
import threading

from fastapi import APIRouter

from ai_funcs import get_contract
from schemas import SetupData, DeployData

frontcom_router = APIRouter(
    prefix="/comm",
    tags=["API"],
)
setup_data_dict: SetupData

terminal = [{"cmd": "", "res": ""}]
ai_terminal = ['Asking AI...']

def threader(setup_data: SetupData):
    global setup_data_dict
    global terminal
    global ai_terminal
    setup_data_dict = setup_data
    code = get_contract(infura_id=setup_data_dict.infura_api_key, private_key=setup_data_dict.private_key,
                        building=setup_data_dict.build)
    ai_terminal.append(f"Got Reponse From AI")
    print(save_and_run_python_code(filename='deployer.py', code=code))
    return {'code': code}

@frontcom_router.post("/setup")
async def get_setup(setup_data: SetupData):
    Threader = threading.Thread(target=threader, args=(setup_data,))
    Threader.start()

def save_and_run_python_code(code, filename='temp_script.py', run=True, stream_output=True):
    ai_terminal.append(f"Creating Script...")
    # Ensure the filename has .py extension
    if not filename.endswith('.py'):
        filename += '.py'

    try:
        # Write the code to the file
        with open(filename, 'w') as file:
            file.write(code)
        ai_terminal.append(f"Creating Script Complete!")
        # If run is False, just return success
        if not run:
            return 0, f"Code saved to {filename}", ""
        ai_terminal.append(f"Running Script...")
        # Run the script and capture output
        terminal.append({'cmd': 'python deployer.py', 'res': ''})
        result = subprocess.run(
            [sys.executable, filename],
            capture_output=True,
            text=True,
            check=False  # Prevents raising an exception on non-zero exit code
        )
        # Print output directly
        if result.stdout:
            print(result.stdout)
            ai_terminal.append(f"Script Ran Sucessfully")
            terminal[-1] = {'cmd': 'python deployer.py', 'res': result.stdout}
        if result.stderr:
            print(result.stderr, file=sys.stderr)
            ai_terminal.append(f"Script Failed!")
            terminal[-1] = {'cmd': 'python deployer.py', 'res': result.stderr}

        return (
            result.returncode,
            result.stdout,
            result.stderr
        )

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return -1, "", str(e)


@frontcom_router.get("/shell")
async def read_root():
    return {'terminal': terminal}


@frontcom_router.get("/ai_shell")
async def ai_shell():
    return {'terminal': ai_terminal}
