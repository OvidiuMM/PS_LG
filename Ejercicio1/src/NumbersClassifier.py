import sys

class Classifier:
    """utility class for number classification as  DEFICIENT, PERFECT or ABUNDANT"""

    classification = ("DEFICIENT", "PERFECT" , "ABUNDANT", "NOT A POSITIVE NUMBER")
    def list_classifier(self, number_list):
        """Function that recieves a list of numbers and returns a dictionary with the classification of each one

        Input: a list of numbers
        Output:  dictionary with the numbers (as key) and their characteristic - DEFICIENT, PERFECT or ABUNDANT
        """
        classified_result = {}
        for number in number_list:
            if isinstance(number,int):
                classified_result[number] = self.num_classifier(number)
            else:
                classified_result[number] = self.classification[3]
        return classified_result

    def num_classifier(self, number):
        """Function that recieves an number and returns it's classification

        Input: one number
        Output: number characteristic - DEFICIENT, PERFECT or ABUNDANT
        """
        if number == 1:
            return self.classification[0]

        sum_up = 1
        for divisor in range(2,number):
            if number % divisor == 0:
                sum_up += divisor
        if sum_up == number:
            return self.classification[1]
        elif sum_up > number:
            return self.classification[2]

        return self.classification[0]


if __name__ == "__main__":
    Classifier.list_classifier(sys.argv)
