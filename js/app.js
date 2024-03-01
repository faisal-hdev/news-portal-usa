// get the all container element
const categoryContainerEl = document.getElementById("category-container");
const CardContainerEl = document.getElementById("card-container");

const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const response = await fetch(url);
  const data = await response.json();
  const accessApiData = data.data.news_category;
  accessApiData.forEach((singleCategory) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
      <button onclick="loadNews('${singleCategory.category_id}')"
            class="bg-indigo-200 hover:text-white hover:bg-indigo-400 duration-300 text-black max-sm:px-2 px-5 py-2 cursor-pointer rounded-lg"
          >
        ${singleCategory.category_name}
      </button>
    `;
    categoryContainerEl.appendChild(newDiv);
  });
};

const loadNews = async (catId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
  const response = await fetch(url);
  const data = await response.json();
  const newsData = data.data;
  CardContainerEl.innerHTML = "";
  console.log(newsData);
  newsData.forEach((singleNews) => {
    if (newsData.length === 0) {
      alert("hello");
    }
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div class="max-sm:w-auto md:w-[900px] flex max-sm:flex-col bg-base-100 shadow-md border">
            <div class='flex items-center justify-center'>
              <img class='p-4' src="${singleNews?.thumbnail_url}" alt="Movie"/>
            </div>
            <div class="card-body max-sm:w-auto md:w-[550px]">
                <div class='flex max-sm:flex-col'>
                    <h2 class="card-title max-sm:text-center">${
                      singleNews?.title
                    }</h2>
                    <div class='text-center'>
                        <p>${singleNews?.rating?.badge}</p>
                        <p>${singleNews?.rating?.number}</p>
                    </div>
                </div>
                <p class='max-sm:text-center'>${singleNews?.details.slice(
                  0,
                  180
                )}.....<span class='text-[14px]'>see more</span></p>
                <div class='flex max-sm:flex-col max-sm:gap-5 items-center justify-between mt-4'>
                    <div class="flex items-center">
                        <div>
                        <img class='p-4 w-20 object-cover rounded-full' src="${
                          singleNews?.author?.img
                        }" alt="Movie"/>
                        </div>
                        <div>
                        <p>Name : ${singleNews?.author?.name}</p>
                        <p>Date : ${singleNews?.author?.published_date}</p>
                        
                        </div>
                    </div>
                    <div class="flex items-center">
                    <i class="fa-solid fa-eye mr-2"></i> <p>${
                      singleNews?.total_view
                    }</p>
                    </div>
                    <div class="">
                        <button class="bg-indigo-500 font-medium hover:bg-indigo-600 duration-300 text-white max-sm:px-4 max-sm:py-2 px-6 py-2 cursor-pointer rounded-lg">Details</button>
                    </div>
                </div>
            </div>
        </div>
      `;
    CardContainerEl.appendChild(newDiv);
  });
};

loadNews("01");
loadCategories();
