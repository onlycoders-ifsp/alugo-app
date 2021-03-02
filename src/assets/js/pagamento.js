const mercadopago = require ('mercadopago');

// Configura credenciais
mercadopago.configure({
  access_token: 'TEST-3839591210769699-020717-920ee176862d215166e271d66e8432f7-132870722'
});

// Cria um objeto de preferência
let preference = {
  items: [
    {
      title: 'Meu produto',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor substituirá a string "<%= global.id %>" no seu HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});