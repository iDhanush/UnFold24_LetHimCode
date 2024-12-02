from pydantic import constr, BaseModel


class SetupData(BaseModel):
    os: constr(pattern="^(windows|linux|mac)$") = 'windows'
    chain: str = 'sepolia'
    private_key: str = 'a257ba706cabccd25fc1a120c9dc44dfc8bf6264e2ee24f977b8b422dcad2c0e'
    infura_api_key: str = 'eab9f2aff8984a57ac11c6043cf87d78'
    build: str = 'nft marketplace'


class DeployData(BaseModel):
    building: str
