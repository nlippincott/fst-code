<?php

class code_controller extends FST\Controller {

	public function init () {

		// Determine file name
		$fname = __DIR__ . '/../' . $this->args();

		// Check if file exists
		if (!file_exists($fname))
			$this->notfound();

		// Send the file
		FST\Framework::send_static($fname);

		exit;
	}
}
