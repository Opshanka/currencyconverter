import React from 'react'

export default function MainPage() {
    return (
        <div>
            <h1 className='lg:mx-32 text-5xl font-bold text-green-500'> Money is everything</h1>
            <p className='lg:mx-32 opacity-40 py-3'> Convert Your currency in real time</p>
            <div className='mt-5 flex items-center justify-center'>
                <section className='w-full lg:w-1/2'>
                    <form>
                        <div className="mb-5">
                            <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                            <input type="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" required />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}
