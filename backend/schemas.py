from pydantic import constr, BaseModel


class SetupData(BaseModel):
    os: constr(pattern="^(windows|linux|mac)$")
    chain: str
    private_key: str
    infura_api_key: str
