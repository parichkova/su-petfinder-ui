<?php

require_once (dirname(__DIR__) . "/server/controllers/ctrl_petfinder.php");

$employee = new Employee();

$getParams = !empty($_GET) ? $_GET : FALSE;

if ($getParams) {
    $employee->get();
} else {
    //this is for put/post/delete/further logic
}

?>
