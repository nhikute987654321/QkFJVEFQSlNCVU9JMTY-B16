class NhanVienList {
  constructor() {
    this.arr = [];
  }

  addNhanVien(nhanVien) {
    this.arr.push(nhanVien);
  }

  findIndexNhanVien(id) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const nhanVien = this.arr[i];
      if (nhanVien.id === Number(id)) {
        index = i;
        break; 
      }
    }
    return index;
  }

  removeNhanVien(id) {
    const index = this.findIndexNhanVien(id);

    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  getNhanVienById(id) {
    const index = this.findIndexNhanVien(id);
    if (index !== -1) {
      // tìm thấy nhanVien
      return this.arr[index];
    }

    return null;
  }

  updateNhanVien(nhanVien) {
    const index = this.findIndexNhanVien(nhanVien.id);

    if (index !== -1) {
      this.arr[index] = nhanVien;
    }
  }

  filterNhanVien(type) {
    if (type === "all") {
      return this.arr;
    }

    let arrFiltered = [];
    for (let i = 0; i < this.arr.length; i++) {
      const nhanVien = this.arr[i];
      if (nhanVien.type === type) {
        arrFiltered.push(nhanVien);
      }
    }
    return arrFiltered;
  }

  searchNhanVien(keyword) {
 
    let findNhanViens = [];

    for (let i = 0; i < this.arr.length; i++) {
      const nhanVien = this.arr[i];
      const xepLoaiLowerCase = nhanVien.xepLoai.toLowerCase();
      const keywordLowerCase = keyword.toLowerCase();
      const index = xepLoaiLowerCase.indexOf(keywordLowerCase);
      if (index !== -1) {
        findNhanViens.push(nhanVien);
      }
    }

    return findNhanViens;
  }
}

export default NhanVienList;
