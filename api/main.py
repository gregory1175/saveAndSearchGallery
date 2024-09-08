import os
import requests
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

gallery = mongo_client.gallery 
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_RANDOM_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_SEARCH_URL = "https://api.unsplash.com/search/photos"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", ""))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file, and insert there UNSPLASH_KEY"
    )

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG

# connect with database 
@app.route("/images", methods=["GET","POST"])
def images():
    if request.method == "GET":
        # read images from database 
         images  = images_collection.find({})
         return jsonify([img for img in images])
    if request.method == "POST":
        # save image in the database 
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}

# connect with frontend
@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": f"Client-ID {UNSPLASH_KEY}"}
    params = {"query": word}
    response = requests.get(url=UNSPLASH_RANDOM_URL, headers=headers, params=params)

    data = response.json()
    return jsonify(data)


@app.route("/search/photos")
def get_all_photo():
    word = request.args.get("query")
    
    if not word:
        return jsonify({"error": "query parameter is required"}), 400
    
    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {UNSPLASH_KEY}"
    }
    params = {
        "query": word,
        "per_page": 30, 
        "page": 1        
    }

    response = requests.get(url=UNSPLASH_SEARCH_URL, headers=headers, params=params)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch search results"}), response.status_code

    data = response.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5050")
