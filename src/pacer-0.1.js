function pacer (commands) {

	// Parameter: An array of "commands" to execute in sequence.
	//	A command may be:
	//		- A function, which is executed once.
	//		- An array where [0] is a function and [1] is a number, in which
	//			case the function is executed multiple times with a delay
	//			between each function call. Repetition is based on the return
	//			value of the function; if returns true, repeat after delay.
	//			The number given in [1] must be greater than zero.
	//		- An array where [0] is the string 'delay' and [1] is a number,
	//			in which case a delay occurs before the next command.

	// Parameter must be an array.
	if (!Array.isArray(commands))
		throw "pacer: commands not given as an array";

	// If commands array is empty, done.
	if (commands.length == 0)
		return;

	// If commands[0] is a function, call it, then process remaining commands.
	if (typeof(commands[0]) == 'function') {
		commands[0]();
		commands.shift();
		pacer(commands);
		return;
	}

	// Now, commands[0] must be an array of length 2, and commands[0][1]
	//	must be a number > 0.
	if (!(Array.isArray(commands[0]) &&
			commands[0].length > 0 && commands[0][1] > 0))
		throw "pacer: invalid command";

	// If commands[0][0] is 'delay', introduce a delay then process the
	//	remaining commands.
	if (commands[0][0] === 'delay') {
		var delay = commands[0][1];
		commands.shift();
		setTimeout(function () { pacer(commands); }, delay);
		return;
	}

	// Now, commands[0][0] must be a function.
	if (typeof(commands[0][0]) != 'function')
		throw "pacer: invalid command";

	// Call the function given in commands[0][0]. If return true, introduce
	//	delay specified by commands[0][1], then re-process the commands
	//	(thus repeating the function after a delay). Otherwise, remove the
	//	command and process the remaining commands.
	if (commands[0][0]() === true) {
		setTimeout(function () { pacer(commands); }, commands[0][1]);
		return;
	}
	commands.shift();
	pacer(commands);
}
