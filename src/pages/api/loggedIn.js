// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    /**LOGIC FOR LOGING IN */
    res.status(200).json({
        LoggedIn: false,
        status:200,
        timestamp:new Date().getTime()
     })
  }
  