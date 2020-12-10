

//DOCUMENTATION USED:

//https://github.com/axios/axios
//https://strapi.io/documentation/v3.x/content-api/parameters.html
//https://strapi.io/documentation/v3.x/guides/auth-request.html#introduction
//https://strapi.io/documentation/v3.x/content-api/api-endpoints.html#endpoints

let con = {};
let authToken = "";

const formElement = document.querySelector('form');
formElement.addEventListener('submit', e => {
  e.preventDefault();
  handleFormSubmit();
});


const handleFormSubmit = async () => {

  const formElements = formElement.elements;

  const data = {};
  console.log(formElements["profile_picture"].files[0]);
  console.log(formElements["email"].value);
  console.log(formElements["username"].value);
  console.log(formElements["password"].value);
  console.log(formElements["first_name"].value);
  console.log(formElements["last_name"].value);
  

  con = new StrapiApiConnection();

  //let response = await con.createUser("testfgd65hdil@mail.com","f", "tse56345gsdfr02", "test", "user")
  let response = await con.createUser(  formElements["email"].value,
                                        formElements["password"].value, 
                                        formElements["username"].value, 
                                        formElements["first_name"].value, 
                                        formElements["last_name"].value,
                                        formElements["campus_id"].value,
                                        formElements["profile_picture"].files[0] );


  console.log(response);


}


/* MAIN - testing other functions */
const main = async () => {


 

};

main();
