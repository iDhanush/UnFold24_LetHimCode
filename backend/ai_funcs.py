from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.document_loaders import TextLoader
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings

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


def get_contract(infura_id, private_key, building):
    query = f'''
    os: windows
    chain: sepolia
    WEB3_INFURA_PROJECT_ID:{infura_id}
    PRIVATE_KEY: {private_key}

    Steps to deploy smart contracts are given below
    1) create a folder blockchain
    2) cd blockchain
    3) run brownie init command inside blockchain
    4) create .sol file for {building} completely and move it into contracts file 
    5) create deploy.py for {building}.sol and move it to scripts folder
    6) create .env file
    7) create brownie-config.yaml file
    8) run brownie run scripts/deploy.py --network sepolia
     creates all the files required and deploys the contract
    provide only the answer. No extra explanations
    Full implementation of all the files should be done especialy contracts and deploy.py
    deploy only in sepolia test network
    Follow strict order and keen implementation
    provide me a text for the python file
    '''
    answer = get_answer(query)
    kk = (answer.replace('```python', '').replace('```', ''))
    return kk
