<?php
require_once(dirname(__DIR__).'/config/database.php');

class ModelPetfinder {
    private $db;
    private $possibleAnimals = array('barnyard','bird','cat','dog','horse','pig', 'reptile');

    public function __construct() {
        $dbConnecter = new DatabaseConnector();
        $this->db = $dbConnecter->getConnection();
    }

    public function getAnimal($animal, $breed) {
        $res = new \stdClass;
        $res->message = "";
        $res->isValid = false;
        $escapedName = $this->db->quote("%$animal%");

        $searchQuery = "select * $animal;";

        if (empty($animal)) {
            $res->message = "Animal is required";
        } else if (!in_array($animal, $possibleAnimals)) {
            $res->message = "There is no information for this animal";
        } else {
            $dbResult = $this->db->query($searchQuery, PDO::FETCH_ASSOC);
            
            $z = '';
            foreach ($dbResult as $row) {
                $resArr[] = $row;
            }

            $res->isValid = true;
            $res->dbResult = isset($resArr) ? $resArr : [];
        }

        return $res;
    }

    public function getUserTaxes($user_id) {
        $res = new \stdClass;
        $res->message = "";
        $res->isValid = false;
        $searchQuery = "select income_tax as income, national_insurance as insurance from payments where employee_id = $user_id;";

        if ($user_id < 1) {
            $res->message = "User id is not valid";
        } else {
            $dbResult = $this->db->query($searchQuery, PDO::FETCH_ASSOC);
            
            $z = '';
            foreach ($dbResult as $row) {
                $resArr[] = $row;
            }

            $res->isValid = true;
            $res->dbResult = isset($resArr) ? $resArr : [];
        }

        return $res;
    }

    public function putUserData() {
        echo 'put';
    }

    public function postUserData() {
        echo 'post';    
    }

    public function deleteUserData() {
        echo 'deleted';
    }
}