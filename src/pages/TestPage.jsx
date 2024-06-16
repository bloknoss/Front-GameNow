export default function TestPage() {
    return (

        <div className="mt-5 justify-center flex flex-col text-white">

            <nav class=" ml-96 mr-96 justify-between bg-gradient-to-r  from-blue-800 to-primaryDark p-2 flex items-center ">
                <div class="flex space-x-4">
                    <a href="#" class="text-gray-300 hover:text-white hover-bg-steam-blue-dark px-3 py-1 rounded">Your Store</a>
                    <a href="#" class="text-gray-300 hover:text-white hover-bg-steam-blue-dark px-3 py-1 rounded">New & Noteworthy</a>
                    <a href="#" class="text-gray-300 hover:text-white hover-bg-steam-blue-dark px-3 py-1 rounded">Categories</a>
                </div>
                <div class="flex items-center bg-[#1A387E] px-2 rounded">
                    <input type="text" placeholder="search" class="bg-transparent text-gray-300 px-2 py-1 focus:outline-none" />
                    <button class="text-gray-300 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.2-5.8a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                        </svg>
                    </button>
                </div>
            </nav>

            <section class="flex  flex-col justify-end items-center align-baseline mt-8 mb-8">
                <h2 class="text-2xl mb-4 font-poppins">Featured & Recommended</h2>
                <div class="relative bg-steam-blue p-4 rounded-lg">
                    <div class="flex space-x-4 justify-center">
                        <img src="https://via.placeholder.com/600x300" alt="Featured Game" class="rounded-lg" />
                        <div class="flex flex-col justify-center">
                            <div>
                                <h3 class="text-3xl font-duru">Dead Space</h3>
                                <p class="text-gray-400 font-poppins">Now Available</p>
                            </div>
                            <div class="mt-4 gap-1 grid grid-cols-2">
                                <img src="https://via.placeholder.com/150" alt="Screenshot 1" class="rounded" />
                                <img src="https://via.placeholder.com/150" alt="Screenshot 2" class="rounded" />
                                <img src="https://via.placeholder.com/150" alt="Screenshot 3" class="rounded" />
                                <img src="https://via.placeholder.com/150" alt="Screenshot 4" class="rounded" />
                            </div>
                            <div class="mt-4">
                                <span class="bg-green-600 text-white px-2 py-1 rounded">-70%</span>
                                <span class="line-through text-gray-400">59,99€</span>
                                <span class="text-green-400">17,99€</span>
                            </div>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 left-0 flex items-center">
                        <button class="bg-gray-700 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center">
                        <button class="bg-gray-700 bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>




        </div>



    );

};