/* eslint-disable import/no-anonymous-default-export */
export default (req, res) => {
  const body = JSON.parse(req.body)
  console.log(body)
  res.status(200).json({ status: "OK" })
}
