from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Danh sách các origin được phép
    allow_credentials=True,
    allow_methods=["*"],     # Cho phép tất cả các phương thức (GET, POST, PUT, DELETE, ...)
    allow_headers=["*"],     # Cho phép tất cả các headers
)
 
class IuserInforReq(BaseModel):
    firstname: str
    lastname: str
    company: str
    email: str
    username: str
    password: str

class IuserInforRes(BaseModel):
    id: int
    firstname: str
    lastname: str
    company: str
    email: str
    username: str
    password: str

last_id = 4

users_list: List[IuserInforRes] = [    {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "company": "Example Corp",
        "email": "john.doe@example.com",
        "username": "johndoe",
        "password": "securepassword123"
    },
    {
        "id": 2,
        "firstname": "Jane",
        "lastname": "Smith",
        "company": "Tech Solutions",
        "email": "jane.smith@example.com",
        "username": "janesmith",
        "password": "mypassword456"
    },
    {
        "id": 3,
        "firstname": "Alice",
        "lastname": "Johnson",
        "company": "Creative Inc.",
        "email": "alice.johnson@example.com",
        "username": "alicej",
        "password": "password789"
    },
    {
        "id": 4,
        "firstname": "Bob",
        "lastname": "Brown",
        "company": "Business LLC",
        "email": "bob.brown@example.com",
        "username": "bobbrown",
        "password": "pass1234"
    }
]

@app.get("/list_user") 
def list_users():
    return users_list

@app.get("/user/{user_id}")
def get_user(user_id : int):  # Thêm tham số user_id vào hàm
    for user in users_list:
        if user["id"] == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")  # Nếu không tìm thấy, trả về lỗi 404  # Nếu không tìm thấy, trả về lỗi 404
@app.post("/create-user/")
def create_item(user:IuserInforReq):
    print(user)
    global last_id
    last_id += 1 
    user_dict = user.model_dump() 
    user_dict["id"] = last_id 
    users_list.insert(0, user_dict)
    return {"status" : 200}