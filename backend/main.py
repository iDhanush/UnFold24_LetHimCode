from frontcom.api import frontcom_router
from server import app
from pyngrok import ngrok
import nest_asyncio
app.include_router(frontcom_router)
auth_token = "2pVo1Jfcx0mc61PMALqsa83LFgn_SZBMbJNPYUrgALwjyxoc"
ngrok.set_auth_token(auth_token)
ngrok_tunnel = ngrok.connect(3987, hostname='thoroughly-lasting-ladybug.ngrok-free.app')
print('Public URL:', ngrok_tunnel.public_url)
nest_asyncio.apply()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=3987)
