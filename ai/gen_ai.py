from dns.e164 import query
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.document_loaders import TextLoader
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

import os
import faiss

# Step 1: Initialize Gemini LLM
# Replace with your Google Gemini API credentials
load_dotenv()
google_gemini = ChatGoogleGenerativeAI(model="gemini-1.5-pro")  # Or another Gemini model you have access to

# Step 2: Load your knowledge base (documents)
loader = TextLoader(r"knowledge_base.txt")  # Adjust to your knowledge base path
documents = loader.load()

# Step 3: Use Gemini embeddings to convert documents into vectors
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")  # Hypothetical class for Gemini embeddings
vector_store = FAISS.from_documents(documents, embeddings)

# Step 4: Set up the retrieval mechanism
retriever = vector_store.as_retriever()

# Step 5: Create the RAG chain
rag_chain = RetrievalQA.from_chain_type(llm=google_gemini, chain_type="stuff", retriever=retriever)

# Step 6: Query the RAG model
def get_answer(query: str):
    response = rag_chain.run(query)
    return response

# Example query
choice = input("Enter the project (Nft, FundMe)")
query = f'''Steps to deploy smart contracts are given below
1) create a folder blockchain
2) cd blockchain
3) run brownie init command inside blockchain
4) create .sol file for {choice} completely and move it into contracts file 
5) create deploy.py for {choice}.sol and move it to scripts folder
5.5) accepts private key and infura id from user
6) create .env file
7) create brownie-config.yaml file
8) run brownie run scripts/deploy.py --network sepolia
Create a python script which accepts neccesery inputs from user and creates all the files required and deploys the contract
provide only the answer. No extra explanations
Full implementation of all the files should be done especialy contracts and deploy.py
deploy only in sepolia test network
Follow strict order and keen implementation
provide me a text for the python file
'''
answer = get_answer(query)
print(answer)


