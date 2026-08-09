import { useState,useEffect } from 'react'
import './App.css'
import Anthropic from '@anthropic-ai/sdk'


const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
})

const API = 'https://life-os-agent-backend.onrender.com'

function App() {

//HABIT
  const [inputValue, setInputValue] = useState('')
  const [habits, setHabits] = useState([])

//tasks
  const [taskValue, setTaskValue] = useState('')
  const [tasks, setTasks] = useState([])

//finance
  const [descValue, setDescValue] = useState('')
  const [amountValue, setAmountValue] = useState('')
  const [finances, setFinances] = useState([])

//freelance
  const [leadValue, setLeadValue] = useState('')
  const [companyValue, setCompanyValue] = useState('')
  const [statusValue, setStatusValue] = useState('New')
  const [leads, setLeads] = useState([])

//api chat 
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [loading, setLoading] = useState(false)


  // const addHabit =()=>{
  //   if(inputValue === '')return
  //   setHabits([...habits, inputValue])
  //   setInputValue('')
  // }
  const addHabit = async () => {
  if (inputValue === '') return
  const res = await fetch(`${API}/habits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: inputValue })
  })
  const newHabit = await res.json()
  setHabits([...habits, newHabit])
  setInputValue('')
  }

  // const addTask = () => {
  // if (taskValue === '') return
  // setTasks([...tasks, taskValue])
  // setTaskValue('')
  // }
  const addTask = async () => {
  if (taskValue === '') return
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: taskValue })
  })
  const newTask = await res.json()
  setTasks([...tasks, newTask])
  setTaskValue('')
 }


  // const addFinance = () => {
  // if (descValue === '' || amountValue === '') return
  // setFinances([...finances, { desc: descValue, amount: Number(amountValue) }])
  // setDescValue('')
  // setAmountValue('')
  // }
  const addFinance = async () => {
  if (descValue === '' || amountValue === '') return
  const res = await fetch(`${API}/finance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ desc: descValue, amount: Number(amountValue) })
  })
  const newFinance = await res.json()
  setFinances([...finances, newFinance])
  setDescValue('')
  setAmountValue('')
  }


  const addLead = async () => {
  if (leadValue === '' || companyValue === '') return
  const res = await fetch(`${API}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lead: leadValue, company: companyValue, status:statusValue })
  })
  const newLead = await res.json()
  setLeads([...leads, newLead])
  setLeadValue('')
  setCompanyValue('')
  setStatusValue('New')
  }

  const sendMessage = async () => {
  if (chatInput === '') return
  
  const userMsg = { role: 'user', text: chatInput }
  setChatMessages([...chatMessages, userMsg])
  setChatInput('')
  setLoading(true)

  const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: chatInput }]
})

const aiMsg = { 
  role: 'ai', 
  text: response.content[0].text 
}

setChatMessages(prev => [...prev, aiMsg])
setLoading(false)
}


useEffect(() => {
  fetch(`${API}/habits`)
    .then(res => res.json())
    .then(data => setHabits(data))
}, [])
useEffect(() => {
  fetch(`${API}/tasks`)
    .then(res => res.json())
    .then(data => setTasks(data))
}, [])
useEffect(() => {
  fetch(`${API}/finance`)
    .then(res => res.json())
    .then(data => setFinances(data))
}, [])
useEffect(() => {
  fetch(`${API}/leads`)
    .then(res => res.json())
    .then(data => setLeads(data))
}, [])
  return (
    <>

   <div className='min-h-screen bg-gray-950 text-white p-6'>
    <h1 className='text-4xl font-bold text-center mb-8'>
    Life OS Agent
    </h1>

    <div className='grid grid-cols-2 gap-6'>
      <div className='bg-grey-800 rounded-2xl p-6'>
        <h2 className='text-xl font-semibold mb-2'>✅Habits</h2>
       <input
          className="w-full bg-gray-700 rounded-lg p-2 mt-2 text-white"
          placeholder="Add a habit..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={addHabit}
          className="mt-3 bg-blue-500 px-4 py-2 rounded-lg w-full"
        >
          Add Habit
          
        </button>

        <ul className="mt-4 space-y-2">
          {habits.map((habit, index) => (
            <li key={index} className="bg-gray-700 rounded-lg p-2">
              {habit.name || habit}
            </li>
          ))}
        </ul>

      </div>


        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">📋 Tasks</h2>
         <input
              className="w-full bg-gray-700 rounded-lg p-2 mt-2 text-white"
              placeholder="Add a task..."
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
            />
            <button
              onClick={addTask}
              className="mt-3 bg-green-500 px-4 py-2 rounded-lg w-full"
            >
              Add Task
            </button>
            <ul className="mt-4 space-y-2">
              {tasks.map((task, index) => (
                <li key={index} className="bg-gray-700 rounded-lg p-2">
                  {task.name || task}
                </li>
              ))}
            </ul>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">💰 Finance</h2>
          <input
              className="w-full bg-gray-700 rounded-lg p-2 mt-2 text-white"
              placeholder="Description..."
              value={descValue}
              onChange={(e) => setDescValue(e.target.value)}
            />
            <input
              className="w-full bg-gray-700 rounded-lg p-2 mt-2 text-white"
              placeholder="Amount..."
              value={amountValue}
              onChange={(e) => setAmountValue(e.target.value)}
            />
            <button
              onClick={addFinance}
              className="mt-3 bg-yellow-500 px-4 py-2 rounded-lg w-full"
            >
              Add Expense
            </button>
            <ul className="mt-4 space-y-2">
              {finances.map((item, index) => (
                <li key={index} className="bg-gray-700 rounded-lg p-2 flex justify-between">
                  <span>{item.desc}</span>
                  <span>₹{item.amount}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-yellow-400 font-bold">
              Total: ₹{finances.reduce((sum, item) => sum + item.amount, 0)}
            </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">🎯 Freelance</h2>
          <input
              className="w-full bg-gray-700 rounded-lg p-2 mt-2 text-white"
              placeholder="Lead name..."
              value={leadValue}
              onChange={(e) => setLeadValue(e.target.value)}
            />
            <input
              className="w-full bg-gray-700 rounded-lg p-2 mt-2 text-white"
              placeholder="Company..."
              value={companyValue}
              onChange={(e) => setCompanyValue(e.target.value)}
            />
            <input
              className="w-full bg-gray-700 rounded-lg p-2 mt-2 text-white"
              placeholder="Status (New/Contacted/Closed)..."
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
            />
            <button
              onClick={addLead}
              className="mt-3 bg-purple-500 px-4 py-2 rounded-lg w-full"
            >
              Add Lead
            </button>
            <ul className="mt-4 space-y-2">
              {leads.map((item, index) => (
                <li key={index} className="bg-gray-700 rounded-lg p-2">
                  <span className="font-bold">{item.lead}</span>
                  <span className="text-gray-400 ml-2">{item.company}</span>
                  <span className="ml-2 text-purple-400">{item.status}</span>
                </li>
              ))}
            </ul>
        </div>
    </div>

              <div className="mt-6 bg-gray-800 rounded-2xl p-6">
  <h2 className="text-xl font-semibold mb-4">🤖 AI Assistant</h2>
  
  <div className="bg-gray-900 rounded-xl p-4 h-48 overflow-y-auto mb-4">
    {chatMessages.map((msg, index) => (
      <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
        <span className="font-bold">{msg.role === 'user' ? 'You: ' : 'AI: '}</span>
        {msg.text}
      </div>
    ))}
    {loading && <p className="text-gray-400">AI is thinking...</p>}
  </div>

  <div className="flex gap-2">
    <input
      className="flex-1 bg-gray-700 rounded-lg p-2 text-white"
      placeholder="Ask your AI assistant..."
      value={chatInput}
      onChange={(e) => setChatInput(e.target.value)}
    />
    <button
      onClick={sendMessage}
      className="bg-blue-500 px-6 py-2 rounded-lg font-bold"
    >
      Send
    </button>
  </div>
</div>
   </div> 
    
    </>
   
    
  )
}

export default App
