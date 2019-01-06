<?php
require(dirname(__DIR__).'/models/model_petfinder.php');

class Petfinder {
    private $model;
    
    
    public function __construct() {
        $this->model = new ModelEmployee();
    }

    public function get() {
        if (!$this->isInputValid($_GET)) {
            exit('Wrong input');
        }

        if (isset($_GET['animal'])) {
            if (isset($_GET['breed'])) {
                echo json_encode($this->model->getBreed($_GET['animal'], $_GET['breed']))
            }

            echo json_encode($this->model->getAnimal($_GET['animal']));
        }
    }

    public function delete() {

    }

    
    public function put() {

    }

    
    public function post() {

    }

    private function isInputValid($getArr) {
        if (!empty($getArr['animal']) || !empty($getArr['breed'])) {
            return true;
        }

        return false;
    }

    private function isValidId($id) {
        if (is_numeric($id)) {
            return true;
        }

        return false;
    }
}

