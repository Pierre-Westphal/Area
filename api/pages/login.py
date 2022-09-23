from pages.database import Database

class Login:
    def __init__(self):
        self.database = Database()

    def get_informations(self, id_number):
        return (self.database.find_one(id_number))
    
