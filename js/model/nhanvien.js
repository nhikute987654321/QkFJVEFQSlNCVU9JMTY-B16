class NhanVien {
    constructor(
        _id,
        _tknv,
        _name,
        _email,
        _password,
        _ngaylam,
        _luongCB,
        _chucvu,
        _gioLam,
        _xepLoai,
        _tongLuong
    ) {
        this.id = _id;
        this.tknv = _tknv;
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.ngaylam = _ngaylam;
        this.luongCB = _luongCB;
        this.chucvu = _chucvu;
        this.gioLam = _gioLam;
        this.xepLoai = _xepLoai;
        this.tongLuong = _tongLuong;
    }

    xepLoaiNhanVien() {
        if (this.gioLam >= 192) {
            return 'Nhân viên xuất sắc';
        } else if (this.gioLam >= 176) {
            return 'Nhân viên giỏi';
        } else if (this.gioLam >= 160) {
            return 'Nhân viên khá';
        } else {
            return 'Nhân viên trung bình';
        }
    }

    tinhTongLuong() {
        let heSo = 1;

        switch (this.chucvu.toLowerCase()) {
            case 'sếp':
                heSo = 3;
                break;
            case 'trưởng phòng':
                heSo = 2;
                break;
            case 'nhân viên':
                heSo = 1;
                break;
            default:
                console.warn('Chức vụ không hợp lệ');
                heSo = 0;
        }

        return this.formatTienTe(Number(this.luongCB) * heSo);
    }

    formatTienTe(number) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(number);
    }

}

export default NhanVien;