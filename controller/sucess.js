module.exports = {
    sucess: (req, res) => {
        commonService.sendCustomResult(req, res, 'SUCCESS', MESSAGE)
    }
}