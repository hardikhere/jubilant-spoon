export default async function getAllProducts() {
  try {
    const res = await fetch(
      "https://interview-assignment-res.s3.ap-south-1.amazonaws.com/pd_resp.json"
    );
    const data = await res.json();
    return {
      data,
      err: null,
    };
  } catch (exp) {
    return {
      data: null,
      err: exp,
    };
  }
}
