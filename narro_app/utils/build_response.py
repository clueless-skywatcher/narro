class BuildMessageResponse:
    def __init__(self, status_code, status: str, msg: str, success: bool) -> None:
        self.status = status
        self.status_code = status_code
        self.msg = msg
        self.success = success

    def build(self):
        return {
            "Status": self.status,
            "StatusCode": self.status_code,
            "Message": self.msg,
            "Success": self.success
        }