export interface IGhost {
    width: number; //độ rộng ghost
    height: number; //độ dài ghost
    _id: string;
    name: string;
    coupon: string; //bỏ, ko dùng
    chance: number; //thuật toán, số càng lớn thì nhận được quà có tỷ lệ thấp sẽ cao
    image: string;
    releaseTime: number; //thời gian đếm ngược ghost vùng vẫy
    countSpace: number; //số lần click chuột hoặc space để bắt ghost
    speed: number; //tốc độ thay đổi vị trí x,y của ghost
    enable: boolean;
    data: string;
}