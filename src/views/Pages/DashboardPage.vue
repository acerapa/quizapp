<template>
  <div class="shadow">
    <div class="border fixed w-60 h-screen bg-[#B2E5C7] p-5">
        <div class="py-10 flex items-center">
            <img src="../../assets/default.png" alt="profile" class="w-10 h-10 rounded-full inline mr-5">
            <span class="text-gray-600 font-bold">Adminstrator</span>
        </div>
        <div class="flex items-center">
            <img src="../../assets/test.png" class="w-10 h-10 mr-5 invert inline cursor-pointer" alt="Test"> <span class="cursor-pointer text-gray-600">Quizes</span>
        </div>
        <div>
            <img src="../../assets/folder.png" class="w-10 h-10 mr-4 invert inline cursor-pointer" alt="Test"> <span class="cursor-pointer text-gray-600">Files</span>
        </div>
    </div>
  </div>
  <div class="ml-60 p-5 overflow-auto h-screen">
      <h1 class="text-xl font-bold mt-11">Dashboard</h1>
      <div class="flex gap-5 mt-11">
        <div class="p-5 border text-center w-60">Quizes</div>
        <div class="p-5 border text-center w-60">Participated</div>
      </div>
      <div class="mt-11 p-5 border w-max">
        table table table
      </div>
  </div>
</template>