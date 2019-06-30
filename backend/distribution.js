function distribution(times, data)
{
	//console.log("in distribution");//
	var result_and_data = {result:[], data: []};
	var result = [
	{
		course_id: 0,
		classroom: "none", 
		students: [],
		count: 0
	}, 
	{
		course_id: 1,
		classroom: "none",
		students: [],
		count: 0
	}, 
	{
		course_id: 2,
		classroom: "none",
		students: [], 
		count: 0
	}
	]

	var all_or_lucky = function(room_course_pair, acc, priority)
	{
		if(course_popular[room_course_pair] <= acc)
		{
			for(i = 0; i < n; i++)
			{
				for(j = 0; j < 3; j++)
				{
					if(data[i].section[times][j].course_id == room_course_pair && data[i].section[times][j].priority == priority && student_state[i] == false)
					{

						student_state[i] = true;
						result[room_course_pair].students.push(data[i]._id);
						result[room_course_pair].count++;
					}
				}
			
			}
		}
		else
		{
			rate = Math.floor(100 * acc / course_popular[room_course_pair]);

			for(i = 0; i < n; i++)
			{
				if(data[i].unlucky && student_state[i] == false)
				{
					if(Math.floor(Math.random() * 100) < rate)
					{
						student_state[i] = true;
						result[room_course_pair].students.push(data[i]._id);
						result[room_course_pair].count++;
						acc--;
					}
					else
					{
						for(j = 0; j < 3; j++)
						{
							if(data[i].section[times][j].priority == 1)
							{
								student_state[i] = true;
								result[data[i].section[times][j].course_id].students.push(data[i]._id);
								result[data[i].section[times][j].course_id].count++;
							}
						}
					}
					
				}
			}
			let total = 0;
			let multi = course_popular[room_course_pair];
			while(total < acc)
			{
				let lucky = Math.floor(Math.random() * multi);
				multi--;
				for(i = 0; i < n; i++)
				{
					for(j = 0; j < 3; j++)
					{
						if(data[i].section[times][j].course_id == room_course_pair && data[i].section[times][j].priority == priority && student_state[i] == false)
						{
							if(lucky == 0)
							{
								student_state[i] = true;
								result[room_course_pair].students.push(data[i]._id);
								result[room_course_pair].count++;
								total++;
							}
							lucky--;
						}
					}
				}
			}
		}
	}

	var test_popularity = function(priority, course_popular,student_state)
	{
		course_popular[0] = 0;
		course_popular[1] = 0;
		course_popular[2] = 0;
		//console.log("n: ", n);
		for(i = 0; i < n; i++)
		{
			for(j = 0; j < 3; j++)
			{
				if(data[i].section[times][j].priority == priority && student_state[i] == false)
				{
					console.log("update");
					course_popular[data[i].section[times][j].course_id] += 1;
					break;
				}
			}
		}
		console.log("course_popular:", course_popular);

	}

	var deal_with_rest = function(student_state)
	{
		for(i = 0; i < n; i++)
		{
			if(student_state[i] == false)
			{
				data[i].unlucky = true;
				for(j = 0; j < 3; j++)
				{
					if(data[i].section[times][j].priority == 2)
					{
						student_state[i] = true;
						result[data[i].section[times][j].course_id].students.push(data[i]._id);
						result[data[i].section[times][j].course_id].count++;
					}
				}
			}
		}
	}

	var distribution_first = function()
	{
		//console.log("in dis_first");//
		all_or_lucky(big_classroom, big_classroom_MAX - result[big_classroom].count, 0);
		console.log(result);
		all_or_lucky(small_classroom0, small_classroom_MAX - result[small_classroom0].count, 0);
		all_or_lucky(small_classroom1, small_classroom_MAX - result[small_classroom1].count, 0);
		//console.log("first state done");//
		test_popularity(1, course_popular, student_state);
		console.log(student_state);
		console.log("\n");
		console.log(course_popular);

		all_or_lucky(big_classroom, big_classroom_MAX - result[big_classroom].count, 1);
		all_or_lucky(small_classroom0, small_classroom_MAX - result[small_classroom0].count, 1);
		all_or_lucky(small_classroom1, small_classroom_MAX - result[small_classroom1].count, 1);
		//console.log("second state done");//
		deal_with_rest(student_state);	
	}
	var distribution_second = function()
	{
		//console.log('in dis second');//
		all_or_lucky(big_classroom, big_classroom_MAX - result[big_classroom].count, 0);
		all_or_lucky(small_classroom0, small_classroom_MAX - result[small_classroom0].count, 0);
		all_or_lucky(small_classroom1, small_classroom_MAX - result[small_classroom1].count, 0);

		test_popularity(1, course_popular, student_state);	
		all_or_lucky(big_classroom, big_classroom_MAX - result[big_classroom].count, 1);
		all_or_lucky(small_classroom0, small_classroom_MAX - result[small_classroom0].count, 1);
		all_or_lucky(small_classroom1, small_classroom_MAX - result[small_classroom1].count, 1);

		deal_with_rest(student_state);


		result_and_data.data = data;
		result_and_data.result[0] = result;

		result = [
		{
			course_id: 0,
			classroom: "none", 
			students: [],
			count: 0
		}, 
		{
			course_id: 1,
			classroom: "none",
			students: [],
			count: 0
		}, 
		{
			course_id: 2,
			classroom: "none",
			students: [], 
			count: 0
		}
		]

		times += 1;

		big_classroom = -1;//存課程id
		small_classroom0 = -1;
		small_classroom1 = -1;

		n = data.length;
		student_state = [];
		for(i = 0; i < n; i++)
		{
			student_state.push(false);
		}
		course_popular = [0, 0, 0];
		best_course = -1;
		test_popularity(0, course_popular, student_state);
		console.log("test");
		console.log(course_popular);
		temp = Math.max(course_popular[0], course_popular[1], course_popular[2]);
		for(i = 0; i < 3; i++)
		{
			if(temp == course_popular[i])
			{
				best_course = i;
				result[i].classroom = "big";
				big_classroom = i;
				break;
			}
		}
		for(i = 0; i < 3; i++)
		{
			if(best_course == i)
				continue;
			else if(small_classroom0 == -1)
			{
				small_classroom0 = i;
				result[i].classroom = "small0";
			}
			else
			{
				small_classroom1 = i;
				result[i].classroom = "small1";
			}
		}

		var music_done = [];
		var m = result_and_data.result[0][1].students.length;
		for(i = 0; i < n; i++)
		{
			let flag = false;
			for(j = 0; j < m; j++)
			{
				if(result_and_data.result[0][1].students[j] === data[i]._id)
				{
					flag = true;
					music_done[i] = true;
					break;
				}
			}
		}
		for(i = 0; i < n; i++)
		{
			if(music_done[i])
			{
				for(j = 0; j < 3; j++)
				{
					for(k = 0; k < 3; k++)
					{
						if(data[i].section[times][j].priority == k && data[i].section[times][j].course_id != 0)
						{
							student_state[i] = true;
							result[data[i].section[times][j].course_id].students.push(data[i]._id);
							result[data[i].section[times][j].course_id].count++;
							break;
						}
					}
				}
				
			}
		}
		all_or_lucky(big_classroom, big_classroom_MAX - result[big_classroom].count, 0);
		all_or_lucky(small_classroom0, small_classroom_MAX - result[small_classroom0].count, 0);
		all_or_lucky(small_classroom1, small_classroom_MAX - result[small_classroom1].count, 0);

		test_popularity(1, course_popular, student_state);	
		all_or_lucky(big_classroom, big_classroom_MAX - result[big_classroom].count, 1);
		all_or_lucky(small_classroom0, small_classroom_MAX - result[small_classroom0].count, 1);
		all_or_lucky(small_classroom1, small_classroom_MAX - result[small_classroom1].count, 1);

		deal_with_rest(student_state);

		result_and_data.data = data;
		result_and_data.result[1] = result;


	}

	big_classroom_MAX = 50;
	big_classroom_MIN = 36;
	small_classroom_MAX = 32;
	small_classroom_MIN = 25;

	var big_classroom = -1;//存課程id
	var small_classroom0 = -1;
	var small_classroom1 = -1;
	var music_done = [];
	var n = data.length;

	var student_state = [];
	for(i = 0; i < n; i++)
	{
		music_done.push(false);
		student_state.push(false);
	}
	var course_popular = [0, 0, 0];
	var best_course = -1;
	test_popularity(0, course_popular, student_state);
	console.log("hello");
	console.log(course_popular);
	temp = Math.max(course_popular[0], course_popular[1], course_popular[2]);
	for(i = 0; i < 3; i++)
	{
		if(temp == course_popular[i])
		{
			best_course = i;
			result[i].classroom = "big";
			big_classroom = i;
			break;
		}
	}
	for(i = 0; i < 3; i++)
	{
		if(best_course == i)
			continue;
		else if(small_classroom0 == -1)
		{
			small_classroom0 = i;
			result[i].classroom = "small0";
		}
		else
		{
			small_classroom1 = i;
			result[i].classroom = "small1";
		}
	}

	if(times == 0)
	{
		//console.log("in times == 0");//
		distribution_first();
		result_and_data.data = data;
		result_and_data.result[0] = result;
	}
	else if(times == 1)
	{
		distribution_second();
	}


	//console.log("almost done");//
	return result_and_data;


}

module.exports.distribution = distribution
