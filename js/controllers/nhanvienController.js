
import NhanVienList from "../model/nhanvien-list.js";
import NhanVien from "../model/nhanvien.js";
import Validation from "../model/validation.js";

const nhavienList = new NhanVienList();
const validation = new Validation();

const NV_LIST = "NV_LIST";
const NV_UPDATE = "NV_UPDATE";
export const getEle = (id) => {
  return document.getElementById(id);
};

const getValue = () => {

  const tknv = getEle("tknv").value;
  const name = getEle("name").value;
  const email = getEle("email").value;
  const password = getEle("password").value;
  const ngaylam = getEle("datepicker").value;
  const luongCB = getEle("luongCB").value;
  const chucvu = getEle("chucvu").value;
  const gioLam = getEle("gioLam").value;

  let isValid = true;
  isValid &=
    validation.checkEmpty(tknv, "tbTKNV", "(*) Vui lòng nhập tài khoản") &&
    validation.checkCharacterLength(tknv, "tbTKNV", "(*) Tên tài khoản từ 4-6 ký tự", 4, 6);
  
  isValid &=
    validation.checkEmpty(name, "tbTen", "(*) Vui lòng nhập Họ và tên") &&
    validation.checkString(name, "tbTen", "(*) Tên không hợp lệ", 4, 6);
  
  isValid &=
    validation.checkEmpty(email, "tbEmail", "(*) Vui lòng nhập Email") &&
    validation.checkEmail(email, "tbEmail", "(*) Email không hợp lệ", 4, 6);
  
  isValid &=
    validation.checkEmpty(password, "tbMatKhau", "(*) Vui lòng nhập password") &&
    validation.checkPassword(password, "tbMatKhau", "(*) Password không hợp lệ", 4, 6);
  
  isValid &=
    validation.checkEmpty(ngaylam, "tbNgay", "(*) Vui lòng nhập Ngày làm") &&
    validation.checkDate(ngaylam, "tbNgay", "(*) Ngày làm không hợp lệ", 4, 6);
  
  isValid &=
    validation.checkEmpty(luongCB, "tbLuongCB", "(*) Vui lòng nhập Lương cơ bản") &&
    validation.checkNumber(luongCB, "tbLuongCB", "(*) Số tiền từ 1 000 000 - 20 000 000", 1000000, 20000000);
  
  isValid &=
    validation.checkEmpty(chucvu, "tbChucVu", "(*) Vui lòng chọn Chức vụ");
  
  isValid &=
    validation.checkEmpty(gioLam, "tbGiolam", "(*) Vui lòng nhập Giờ làm") &&
    validation.checkNumber(gioLam, "tbGiolam", "(*) Giờ làm từ 80 - 200", 80, 200);
  
  if (!isValid) return;

  const nhanVien = new NhanVien(
    nhavienList.arr.length + 1,
    tknv, name, email, password, ngaylam, luongCB, chucvu, gioLam, null, null
  );

  nhanVien.xepLoai = nhanVien.xepLoaiNhanVien();
  nhanVien.tongLuong = nhanVien.tinhTongLuong();
  return nhanVien;
}

getEle("btnThemNV").onclick = function () {
  const nhanVien = getValue();

  if (!nhanVien) return;


  nhavienList.addNhanVien(nhanVien);

  renderNhanVienList(nhavienList.arr);
}

const renderNhanVienList = (data) => {

  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const nhanVien = data[i];
    /**<td>${i + 1}</td>
     * <td>${nhanVien.password}</td>
     */
    contentHTML += `
      <tr>
        
        <td>${nhanVien.tknv}</td>
        <td>${nhanVien.name}</td>
        <td>${nhanVien.email}</td>
        
        <td>${nhanVien.ngaylam}</td>
        <td>${nhanVien.chucvu}</td>
        <td>${nhanVien.tongLuong}</td>
         <td>${nhanVien.xepLoai}</td>
        <td>
          <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="onEditNhanvien('${nhanVien.id
      }')">Edit</button>
          <button class="btn btn-danger" onclick="onDeleteNhanvien('${nhanVien.id
      }')">Delete</button>
        </td>
      </tr>    
    `;
  }
  getEle("tableDanhSach").innerHTML = contentHTML;
};


const onDeleteNhanvien = (id) => {
  nhavienList.removeNhanVien(id);
  renderNhanVienList(nhavienList.arr);
  setLocalStorage("NV_LIST", nhavienList.arr);
};
// Khai báo onDeleteFood ra đối tượng window
window.onDeleteNhanvien = onDeleteNhanvien;

const setLocalStorage = (key, data) => {
  const dataString = JSON.stringify(data);
  localStorage.setItem(key, dataString);
};

const getLocalStorage = (key) => {
  const dataString = localStorage.getItem(key);

  return dataString ? JSON.parse(dataString) : null;
};
const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const onEditNhanvien = (id) => {
  console.debug();
  getEle("btnCapNhat").style.display = "block";
  getEle("btnThemNV").style.display = "none";

  getEle("header-title").innerHTML = "Sửa nhân viên";
  const nhavien = nhavienList.getNhanVienById(id);
  if (nhavien) {
    setLocalStorage(NV_UPDATE, nhavien);
    getEle("tknv").value = nhavien.tknv;
    getEle("name").value = nhavien.name;
    getEle("email").value = nhavien.email;
    getEle("password").value = nhavien.password;
    getEle("datepicker").value = nhavien.ngaylam;
    getEle("luongCB").value = nhavien.luongCB;
    getEle("chucvu").value = nhavien.chucvu;
    getEle("gioLam").value = nhavien.gioLam;
  }
}
window.onEditNhanvien = onEditNhanvien;

getEle("btnThem").onclick = function () {
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "block";
}

getEle("btnCapNhat").onclick = function () {
  console.debug();
  const nvUpdate = getLocalStorage(NV_UPDATE);
  const nv = getValue();
  nv.id = nvUpdate.id;

  nhavienList.updateNhanVien(nv);

  getEle("btnDong").click();

  renderNhanVienList(nhavienList.arr);

  resetForm();
  setLocalStorage(NV_LIST, nhavienList.arr);
};

getEle("searchName").addEventListener("keyup", () => {
  const keyword = getEle("searchName").value;

  const nvl = nhavienList.searchNhanVien(keyword);

  renderNhanVienList(nvl);
});

const resetForm = () => {
  getEle("nhanvienForm").reset();
  removeLocalStorage(NV_UPDATE);
};

// const validate = ()=> {

//   validation.checkEmpty()
// }