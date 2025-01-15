import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export function authHeader() {
  const token = localStorage.getItem("token");
  return { authorization: token || "" };
}

// SERVICES

async function getAllContactUs({page, limit, name,}) {
  const params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (name) params.name = name;
  const { data } = await axios.get(`${baseURL}/api/contactUs/getAllContactUs`, {
    headers: authHeader(),
    params
  });
  return data;
}

async function getContactUsById(id) {
  const { data } = await axios.get(
    `${baseURL}/api/contactUs/getContactUsById/${id}`,
    {
      headers: authHeader(),
    }
  );
  return data;
}

async function deleteContactUsById(id) {
  const { data } = await axios.delete(
    `${baseURL}/api/contactUs/deleteContactUs/${id}`,
    {
      headers: authHeader(),
    }
  );
  return data;
}

export async function sendReply(id, sendReply) {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/contactUs/sendReply`,
      { id, sendReply },
      { headers: authHeader() }
    );

    if (!data.success) {
      throw new Error(data.message || "Failed to send reply");
    }
    return data;
  } catch (e) {
    throw new Error(
      e.response?.data?.message || e.message || "An error occurred"
    );
  }
}

async function getAllSentReplies() {
  const { data } = await axios.get(
    `${baseURL}/api/contactUs/getAllSentReplies`,
    {
      headers: authHeader(),
    }
  );
  return data;
}

async function getInquiriesWithoutSendReply() {
  const { data } = await axios.get(
    `${baseURL}/api/contactUs/getInquiriesWithoutSendReply`,
    {
      headers: authHeader(),
    }
  );
  return data;
}

async function getSentReplyById(id) {
  const { data } = await axios.get(
    `${baseURL}/api/contactUs/getSentReplyById/${id}`,
    {
      headers: authHeader(),
    }
  );
  return data;
}

const ContactUsService = {
  getAllContactUs,
  getContactUsById,
  deleteContactUsById,
  sendReply,
  getAllSentReplies,
  getInquiriesWithoutSendReply,
  getSentReplyById,
};

export default ContactUsService;
