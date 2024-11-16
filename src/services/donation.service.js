import { instanceAxios } from "../constants/instanceAxios";
export const createObjectDonation = ({user, name, age, historyOfIssue, currentIssue, status, address}) => {
  return {
    user,
    name,
    age,
    historyOfIssue,
    currentIssue,
    status,
    address
  }

};
export const createDonation = async ({
  user, name, age, historyOfIssue, currentIssue, status, address
}) => {
  const donationObject = createObjectDonation({
    user, name, age, historyOfIssue, currentIssue, status, address
  });
  console.log(donationObject);

  try {
    const response = await instanceAxios.post(
      '/donations',
      JSON.stringify(donationObject), // Converts the object to a JSON string for the request body
      {
        headers: { 'Content-Type': 'application/json' }, // Ensures proper content type for the request
      }
    );
    console.log(response.data); // Logs the server response
    return response.data; // Returns the response data for further processing
  } catch (error) {
    console.error('Error creating donation:', error.response || error.message); // Logs errors clearly
    throw error; // Throws error for calling function to handle
  }
};

