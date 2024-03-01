// get the all container element
const categoryContainerEl = document.getElementById("category-container");
const CardContainerEl = document.getElementById("card-container");

const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const response = await fetch(url);
  const data = await response.json();
  const accessApiData = data.data.news_category;
  accessApiData.forEach((singleCategory) => {
    // console.log(singleItem.category_name);
    const newBtn = document.createElement("button");
    newBtn.className =
      "bg-indigo-200 hover:text-white hover:bg-indigo-400 duration-300 text-black max-sm:px-2 px-5 py-2 cursor-pointer rounded-lg";
    newBtn.innerText = singleCategory?.category_name;
    categoryContainerEl.appendChild(newBtn);
  });
};

const loadNews = async () => {
  const url = "https://openapi.programming-hero.com/api/news/category/01";
  const response = await fetch(url);
  const data = await response.json();
  const newsData = data.data;
  newsData.forEach((singleNews) => {
    console.log(singleNews);
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div class="card max-sm:w-auto w-[700px]  card-side bg-base-100 shadow-md">
            <figure><img class='p-4' src="${
              singleNews?.thumbnail_url
            }" alt="Movie"/></figure>
            <div class="card-body">
                <div class='flex'>
                    <h2 class="card-title">${singleNews?.title}</h2>
                    <div>
                        <p>${singleNews?.rating?.badge}</p>
                        <p>${singleNews?.rating?.number}</p>
                    </div>
                </div>
                <p>${singleNews?.details.slice(
                  0,
                  180
                )}.....<span class='text-[14px]'>see more</span></p>
                <div class='flex max-sm:flex-col max-sm:gap-5 justify-between mt-4'>
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
                    <div class="">
                        <button class="btn btn-primary">Watch</button>
                    </div>
                    <div class="">
                        <button class="btn btn-primary">Watch</button>
                    </div>
                </div>
            </div>
        </div>
      `;
    CardContainerEl.appendChild(newDiv);
  });
};

loadNews();
loadCategories();
