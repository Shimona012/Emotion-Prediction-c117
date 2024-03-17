$(document).ready(function(){
    var date=new Date()

    let display_date="Date: "+date.toLocaleDateString()
    console.log('Ready')
    $("#date").html(display_date)

    //  Fetch the current date and update it in the DOM




    //  write an event, when Submit button is clicked
    $('#button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'#text' : text_value}
        console.log(input_text)

        //  ajax request
        $.ajax({
            url:"/predict",
            //  type of web request
            type : 'POST',

            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),

            //  type of response expected is json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  if everything is successful, run this function
            success : function(result){
                predicted_sentiment=result.data.predicted_sentiment
                senti_url=result.data.predicted_sentiment_img_url
                $("#sentiment").html(predicted_emotion)
                $("#sentiment").css("display","none")
                $("#emoji").attr("src",senti_url)
                $("#emoji").css("display","none")

                // extract prediction and emoticon url from result


                //  update the DOM elements


                //  show them

            },

            //  if any error, run this function
            error : function(result){
                alert(result.responseJSON.message)

                console.log(result)
            }
        })


        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})