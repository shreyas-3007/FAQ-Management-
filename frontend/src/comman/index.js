const backendDomain = "http://localhost:3000";

const summaryApi=
{
  Login:
  {
    url:`${backendDomain}/api/admin-login`,
    method:"POST",
  },
  GetFaqs:
  {
    url:`${backendDomain}/api/faqs`,  
    method:"GET",
  },
  CreateFaq:
  {
    url:`${backendDomain}/api/faq`,
    method:"POST",
  },
  UpdateFaq:
  {
    url:`${backendDomain}/api/faq/:id`,
    method:"PUT",
  },
   DeleteFaq:
  {
    url:`${backendDomain}/api/faq`,
    method:"DELETE",
  }
}

export default summaryApi;