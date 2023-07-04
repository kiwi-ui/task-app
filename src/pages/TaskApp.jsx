import React, { useEffect, useState } from 'react'
import { getList } from '../services/listService';

const TaskApp = () => {
	const [list, setList] = useState([])
	
	useEffect(() => {
		fetcthTask();
	}, [])
	
	const fetcthTask = async () => {
		try {
			const {data} = await getList();
			setList(data);
		}

		catch (error) {
			console.error(error)
		}
	}
	const fewList = list.slice(0,4)
	
  return (
		<>
			<div className='d-flex flex-row flex-wrap'>
				{ fewList.map(task => (
					<div key={task.id} className='bg-'>
						{task.name}
					</div>
				))}
			</div>
		</>
  )
}

export default TaskApp