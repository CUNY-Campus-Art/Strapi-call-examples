

//DOCUMENTATION USED:

//https://github.com/axios/axios
//https://strapi.io/documentation/v3.x/content-api/parameters.html
//https://strapi.io/documentation/v3.x/guides/auth-request.html#introduction
//https://strapi.io/documentation/v3.x/content-api/api-endpoints.html#endpoints


const strapiUrl = "https://dev-cms.cunycampusart.com"; //url to strapi API endpoint
let authToken = "";
const formElement = document.querySelector('form');
formElement.addEventListener('submit', e => {
  e.preventDefault();
  handleFormSubmit();
});

/* getAllArtworks
Function calls to strapi api to get all artworks in db

Accepts:
 - none
Returns:
- JSON data for all artworks
*/
const getAllArtworks = async () => {
  const { data } = await axios.get(strapiUrl+'/artworks');
  console.log("getAllArtworks", data);
  return data;
};

/* getArtworkById
Function calls to strapi api get entry for one artwork

Accepts:
 - id - id of artwork entry
Returns:
 - JSON data for the entry
*/
const getArtworkById = async (id) => {
  const { data } = await axios.get(strapiUrl+'/artworks/'+id);
  console.log("getArtworkById", data);
  return data;
};

/* getAllCampuses
Function calls to strapi api to get all campuses in db

Accepts:
 - none
Returns:
 - JSON data for all campuses
*/
const getAllCampuses = async () => {
  const { data } = await axios.get(strapiUrl+'/campuses');
  console.log("getAllCampuses", data);
  return data;
};

/* getCampusById
Function calls to strapi api get entry for one campus

Accepts:
 - id - id of campus entry
Returns:
 - JSON data for the entry
*/
const getCampusById = async (id) => {
  const { data } = await axios.get(strapiUrl+'/campuses/'+id);
  console.log("getCampusById", data);
  return data;
};

/* getArtworksInCampusByName
Function calls to strapi api get all artwork entries associated to a campus using campus name

Accepts:
 - campusName - name of campus (must be spelled correctly, capitalization doesnt matter)
Returns:
 - JSON data for all artworks associated to the campus
*/
const getArtworksInCampusByName = async (campusName) => {
  const { data } = await axios.get(strapiUrl+'/artworks?campus.campus_name_contains='+campusName);
  console.log("getArtworksInCampusByName", data);
  return data;
};

/* getArtworksInCampusById
Function calls to strapi api get all artwork entries associated to a campus using campus id

Accepts:
 - campusId - id of campus entry
Returns:
 - JSON data for all artworks associated to the campus
*/
const getArtworksInCampusById = async (campusId) => {
  const { data } = await axios.get(strapiUrl+'/artworks?campus.id='+campusId);
  console.log("getArtworksInCampusById", data);
  return data;
};


/* loginAndGetToken
Function calls to strapi api to login a user and get authentication token that will be used for
other calls to create, update, delete entries in database.

Accepts:
 - id - user id (email, username)
 - pw - password for the respective account
Returns: authentication token if call is completed succesfully or -1 if there was a error.
*/
const loginAndGetToken = async (id, pw) => {
  const sendConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const sendData = JSON.stringify({
    identifier: id,
    password: pw,
  })

  const returnData = await axoisPostToStrapi(strapiUrl + '/auth/local',sendData, sendConfig);

  if(returnData.status == 200){
    return returnData.data.jwt;
  }else{
    return -1;
  }
}

/* createArtwork
Function calls to strapi API to create a new artwork entry

Accepts:
  - token - authentication token that was retrieved from logging in
  - dataIn - data for a new artwork entry, example: {title: "new artwork from js", artist:"new artist", description:"test description", year: "2000"}
Returns:
  - full post response from strapi api if successfull or -1 if failed
*/
const createArtwork = async (token, dataIn) => {
  const sendConfig = {
    headers: {
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json'
    }
  };
  const sendData = JSON.stringify(dataIn);
  const returnData = await axoisPostToStrapi(strapiUrl + '/artworks',sendData, sendConfig);
  return returnData;
}

/* updateArtworkById
Function calls to strapi API to updat a artwork entry

Accepts:
  - token - authentication token that was retrieved from logging in
  - id - id of artwork entry
  - dataIn - data for artwork entry, example: {title: "updated artwork from js"}
Returns:
  - full post response from strapi api if successfull or -1 if failed
*/
const updateArtworkById = async (token, id, dataIn) => {
  const sendConfig = {
    headers: {
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json'
    }
  };
  const sendData = JSON.stringify(dataIn);
  const returnData = await axoisPutToStrapi(strapiUrl + '/artworks/' + id,sendData, sendConfig);
  return returnData;
}

/* deleteArtworkById
Function calls to strapi API to delete a artwork entry

Accepts:
  - token - authentication token that was retrieved from logging in
  - id - id of artwork entry
Returns:
  - delete response from strapi API
*/
const deleteArtworkById = async (token, id) => {
  const sendConfig = {
    headers: {
      'Authorization': "Bearer " + token
    }
  };
  const returnData = await axiosDeleteFromStrapi(strapiUrl + '/artworks/' + id, sendConfig);
  return returnData;
}

/* createCampus
Function calls to strapi API to create a new campus entry

Accepts:
  - token - authentication token that was retrieved from logging in
  - dataIn - data for a new campus entry, example: {campus_name: "BMCC"}
Returns:
  - full post response from strapi api if successfull or -1 if failed
*/
const createCampus = async (token, dataIn) => {
  const sendConfig = {
    headers: {
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json'
    }
  };
  const sendData = JSON.stringify(dataIn);
  const returnData = await axoisPostToStrapi(strapiUrl + '/campuses',sendData, sendConfig);
  return returnData;
}

/* updateCampusById
Function calls to strapi API to updat a campus entry

Accepts:
  - token - authentication token that was retrieved from logging in
  - id - id of artwork entry
  - dataIn - data for a new campus entry, example: {campus_name: "BMCC"}
Returns:
  - full post response from strapi api if successfull or -1 if failed
*/
const updateCampusById = async (token, id, dataIn) => {
  const sendConfig = {
    headers: {
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json'
    }
  };
  const sendData = JSON.stringify(dataIn);
  const returnData = await axoisPutToStrapi(strapiUrl + '/campuses/' + id,sendData, sendConfig);
  return returnData;
}

/* deleteCampusById
Function calls to strapi API to delete a campus entry

Accepts:
  - token - authentication token that was retrieved from logging in
  - id - id of campus entry
Returns:
  - delete response from strapi API
*/
const deleteCampusById = async (token, id) => {
  const sendConfig = {
    headers: {
      'Authorization': "Bearer " + token
    }
  };
  const returnData = await axiosDeleteFromStrapi(strapiUrl + '/campuses/' + id, sendConfig);
  return returnData;
}

/* axoisPostToStrapi
Function makes a generic post call to strapi API using provided information

Accepts:
  - url - API route for the post call
  - data - data to be sent with the post call
  - headerConfig - header data to be sent with the post call
Returns: full post response from strapi api if successfull or -1 if failed
*/
const axoisPostToStrapi = async (url, data, headerConfig) => {
  var returnedData = {status:-1};
  try {
    returnedData = await axios.post(url,data, headerConfig);
  } catch (error) {
    console.log(error);
    console.log(url);
    console.log(data);
    console.log(headerConfig);
  }

  if(returnedData.status == 200){
    return returnedData;
  }else{
    console.log('Error in axoisPostToStrapi');
    console.log(returnedData);
    return -1;
  }
}

/* axoisPutToStrapi
Function makes a generic put call to strapi API using provided information

Accepts:
  - url - API route for the post call
  - data - data to be sent with the post call
  - headerConfig - header data to be sent with the post call
Returns: full post response from strapi api if successfull or -1 if failed
*/
const axoisPutToStrapi = async (url, data, headerConfig) => {
  var returnedData = {status:-1};
  try {
    returnedData = await axios.put(url,data, headerConfig);
  } catch (error) {
    console.log(error);
    console.log(url);
    console.log(data);
    console.log(headerConfig);
  }

  if(returnedData.status == 200){
    return returnedData;
  }else{
    console.log('Error in axoisPostToStrapi');
    console.log(returnedData);
    return -1;
  }
}


/* axiosDeleteFromStrapi
Function makes a generic post delete to strapi API

Accepts:
  - url - API route for the delete call
  - headerConfig - header data to be sent with the post call, contains auth token
Returns: full post response from strapi api if successfull or -1 if failed
*/
const axiosDeleteFromStrapi = async (url, headerConfig) => {
  var returnedData = {status:-1};
  try {
    returnedData = await axios.delete(url, headerConfig);
  } catch (error) {
    console.log(error);
    console.log(url);
    console.log(data);
    console.log(headerConfig);
  }

  if(returnedData.status == 200){
    return returnedData;
  }else{
    console.log('Error in axiosDeleteFromStrapi');
    console.log(returnedData);
    return -1;
  }
}


/*axiosUploadToStrapi
Function makes a generic post upload strapi API

Accepts:
  - token - Authorization token
  - files - files to upload
  - entryId -  the id of the entry to associate to the file being upload
  - entryType -  the collection type of the entry being associated to the file (examples of collection types: artwork, campus)
  - entryFieldName -  the field name from the collection type (examples for artwork would be primary_image, other_images)
Returns: full post response from strapi api if successfull or -1 if failed
*/
const axiosUploadToStrapi = async (token, file, entryId, entryType, entryFieldName) => {

  const sendConfig = {
    headers: {
      'Authorization': "Bearer " + token,
      'Content-Type': 'multipart/form-data'
    }
  };


  const formData = new FormData()
  formData.append('files', file)
  formData.append('ref', entryType) // optional, you need it if you want to link the image to an entry
  formData.append('refId', entryId) // optional, you need it if you want to link the image to an entry
  formData.append('field', entryFieldName) // optional, you need it if you want to link the image to an entry


  try {
    returnedData = await axios.post(`${strapiUrl}/upload`, formData, sendConfig);
  } catch (error) {
    console.log(error);
    console.log(url);
    console.log(data);
    console.log(headerConfig);
  }

  if(returnedData.status == 200){
    return returnedData;
  }else{
    console.log('Error in axiosUploadToStrapi');
    console.log(returnedData);
    return -1;
  }
}

const handleFormSubmit = async () => {

  //const request = new XMLHttpRequest();

  const formElements = formElement.elements;

  const data = {};

  for (let i = 0; i < formElements.length; i++) {
    const currentElement = formElements[i];
    if (!['submit', 'file'].includes(currentElement.type)) {
      data[currentElement.name] = currentElement.value;
    }
  }
  var newArtwork = await createArtwork(authToken, data);

  if(formElements["primary_image"].files.length > 0){
    axiosUploadToStrapi(authToken, formElements["primary_image"].files[0], newArtwork.data.id, "artwork", "primary_image");
  }

  for(let i = 0; i < formElements["other_images"].files.length; i++ ){
    axiosUploadToStrapi(authToken, formElements["other_images"].files[i], newArtwork.data.id, "artwork", "other_images");
  }

}


/* MAIN - testing other functions */
const main = async () => {

  authToken = await loginAndGetToken("artworkmanager","2h2Ghswq$%Oxcl");
  console.log("authToken", authToken);

  // await getAllArtworks();
  // await getArtworkById(1);
  // await getAllCampuses();
  // await getCampusById(1);
  // await getArtworksInCampusByName("brooklyn college");
  // await getArtworksInCampusById(1);

  // const newArtwork = await createArtwork(authToken, {title: "new artwork from js", artist:"new artist", description:"test description", year: "2000"});
  // console.log("new artwork",newArtwork);
  // await updateArtworkById(authToken, newArtwork.data.id, {title:"some new title from update function"});
  // //await updateArtworkById(authToken, 3, {campus:1}); //example of updating artworks campus
  // await deleteArtworkById(authToken, newArtwork.data.id);
  //
  // const newCampus  = await createCampus(authToken, {campus_name: "BMCC"});
  // console.log("new campus",newCampus);
  // await updateCampusById(authToken, newCampus.data.id, {campus_name:"test update campus name"});
  // await deleteCampusById(authToken,  newCampus.data.id);


};

main();
