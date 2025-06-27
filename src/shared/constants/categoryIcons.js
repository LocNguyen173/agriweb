// Mapping icon theo index để đảm bảo nhất quán
const iconList = [
  require('@/assets/images/icons/agriculture/plant.png'),
  require('@/assets/images/icons/agriculture/harvest.png'),
  require('@/assets/images/icons/agriculture/water.png'),
  require('@/assets/images/icons/agriculture/insect.png'),
  require('@/assets/images/icons/agriculture/rice.png'),
  require('@/assets/images/icons/agriculture/hand.png')
];

// Function để lấy icon dựa trên categoryId (sử dụng hash để đảm bảo nhất quán)
const getCategoryIcon = (categoryId) => {
  if (!categoryId) return iconList[0]; // fallback icon
  
  // Tạo hash đơn giản từ categoryId để đảm bảo cùng một categoryId luôn có cùng icon
  let hash = 0;
  const idStr = categoryId.toString();
  for (let i = 0; i < idStr.length; i++) {
    const char = idStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Lấy index từ hash
  const index = Math.abs(hash) % iconList.length;
  return iconList[index];
};

// Mapping cố định cho một số categoryId phổ biến (nếu biết trước)
const categoryIcons = {
  "1": iconList[0], 
  "2": iconList[1], 
  "3": iconList[2], 
  "4": iconList[3], 
    "5": iconList[4],
    "6": iconList[5]
};

export { getCategoryIcon, iconList };
export default categoryIcons;
