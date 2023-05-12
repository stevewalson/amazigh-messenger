module.exports = function(app, chalk){
  app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === "EAAGMHbZAkHOwBAJOZCrZAz70tlTOCYIgsCZAEdPOq62zUcegNWZAIRFtMkSMP89TlcnEE8oSPytZAfxNZBmP3GTbEcUi3KB2MFD12r8BNI0K90qf1Hq9k3jZCjAHbXwT2g10ZAZAo06qiFp3xkXPxoZAHyWxxSY2HrrGJHBF8nAYGuH2aLFfE1aVMA4Ef4388dZAWksDQgkZAzVHkCgZDZD"){
       console.log('webhook verified');
       res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error('verification failed. Token mismatch.');
        res.sendStatus(403);
     }
  });
  
  app.post('/webhook', function(req, res) {
    //checking for page subscription.
    if (req.body.object === 'page'){
       
       /* Iterate over each entry, there can be multiple entries 
       if callbacks are batched. */
       req.body.entry.forEach(function(entry) {
       // Iterate over each messaging event
          entry.messaging.forEach(function(event) {
          console.log(event);
          if (event.postback){
             processPostback(event);
          } else if (event.message){
             processMessage(event);
          }
      });
    });
    res.sendStatus(200);
   }
  });
}
