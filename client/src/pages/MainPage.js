import React,{useEffect, useState} from 'react'
import axios from "axios"


export default function MainPage() {
    const [date,setDate] = useState(null);
    const [sourceCurrency,setSourceCurrency] = useState("");
    const [targetCurrency,setTargetCurrency] = useState("");
    const [amountSourceCurrency,setAmountSourceCurrency] = useState(0);
    const [amountTargetCurrency,setAmountTargetCurrency] = useState(0);
const [currencyNames,setCurrencyNames] = useState([]);
const [loading,setLoading] = useState(true);

    //handle submit
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const responce = await axios.get("http://localhost:3000/convert", {params:{
                date,
                sourceCurrency,
                targetCurrency,
                amountSourceCurrency,
            }});

            setAmountTargetCurrency(responce.data)
            setLoading(false)

        //TOD: set the rest....
        }catch{
            console.log(sourceCurrency);
        }
    }

    useEffect(()=>{
        const getCurrencyNames = async() => {
            try {
                const response = await axios.get("http://localhost:3000/getAllCurrencies")
                setCurrencyNames(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCurrencyNames();
    },[]);


    return (
        <div>
            <h1 className='lg:mx-32 text-5xl font-bold text-green-500'> Money is everything</h1>
            <p className='lg:mx-32 opacity-40 py-3'> Convert Your currency in real time</p>
            <div className='mt-5 flex items-center justify-center'>
                <section className='w-full lg:w-1/2'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                            <input type="date" id={date} onChange={(e)=> setDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
                            <select id={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)} name={sourceCurrency} value={sourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
                                <option selected>Select Source Currency</option>
                                {Object.keys(currencyNames).map((currency)=>(<option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>))}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor={targetCurrency}  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
                            <select id={targetCurrency} name={targetCurrency} value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
                                <option selected>Select Target Currency</option>
                                {Object.keys(currencyNames).map((currency)=>(<option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>))}
                  
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor={amountSourceCurrency}  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount In Source Currency</label>
                            <input type='number' id={amountSourceCurrency} onChange={(e) => setAmountSourceCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" required />
                        </div>
                        <button className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md'> Get the target Currency</button>
                    </form>
                </section>
              
            </div>

            {!loading ?
            <section className='lg:mx-60 text-xl mt-5'>
            {amountTargetCurrency} {currencyNames[sourceCurrency]} is equal to <span className='text-green-500 font-bold'>
                 {amountTargetCurrency}
                 </span> {currencyNames[targetCurrency]}

            </section> : null }
        </div>
    )
}
