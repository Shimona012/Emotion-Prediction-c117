# import the necessary modules
from flask import Flask , render_template , request , jsonify

# importing sentiment_analysis file as sa
import sentiment_analysis as sa

app = Flask(__name__)

# app route for index page
@app.route('/')
def home():
    return render_template('index.html')

# write a route for post request
@app.route('/predict' , methods = ['POST'])
def predict_sentiment():
    response=""
    # extract the customer_review by writing the appropriate 'key' from the JSON data
    predict_sentiment = request.json.get('text')

    # check if the customer_review is empty, return error
    if not predict_sentiment:

        response={"status":"error",
                 "message":"Please write some text!"}

        return jsonify(response)
       

    # if review is not empty, pass it through the 'predict' function.
    # predict function returns 2 things : sentiment and path of image in static folder
    # example : Positive , ./static/assets/emoticons/positive.png

    else:
        predicted_sentiment,predicted_sentiment_img_url=sa.predict(response)
        response={"status":"success","data":{
            "predicted_sentiment":predicted_sentiment, 
            "predicted_sentiment_img_url":predicted_sentiment_img_url
        }}
        return jsonify(response)

        

if __name__  ==  "__main__":
    app.run(debug = True)