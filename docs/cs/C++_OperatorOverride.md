# **C++.Operator Overloading**

---

## **1.友元函数**

- `friend`修饰符

`friend`修饰符下的全局函数访问类的私有成员变量的权限。旨在增强与相关类的协作，减少代码的重写。

例如声明一个整型的复数类：

```c++
class Complex {
	private:
		int real, imag;
	public:
		Complex(int reals, int imags) : real(reals), imag(imags) {}
		~Complex() {}
		friend Complex addOther(const Complex& obj_1, const Complex& obj_2);
};

Complex addOther(const Complex& obj_1, const Complex& obj_2) {
	return Complex(obj_1.real + obj_2.real, obj_1.imag + obj_2.imag);
}
```

其中，C++要求默认参数只能放在参数表末尾，for example, `Value operator+(Value v=value, int i);` is **illegal**. Conversly `Value operator+(Value v, int i)` & `Value operator+(Value v=value, int i=0);` is **legal**.

---

## **2.链式调用**

在类的成员函数中利用`this`指针返回对自身的引用以完成链式调用。

For example:

```c++
class Complex {
	private:
		int real, imag;
	public:
		Complex(int reals, int imags) : real(reals), imag(imags) {}
		~Complex() {}
		Complex& addSelf(const Complex& obj);
		void showCase() {
			cout << real << '+' << imag << 'i' << endl;
		}
};

Complex& Complex::addSelf(const Complex& obj) {
	real += obj.real;
	imag += obj.real;
	return *this;
}

auto main() {
	Complex c_1(1, 1), c_2(2, 2), c_3(3, 3);
	c_1.addSelf(c_2).addSelf(c_3).showCase();
    return 0;
}
```

---

## **3.运算符重载**

C++的运算符重载允许自定义类对象的运算，但是运算符的优先级和结合性不能更改，只能定义它们如何作用于类的对象。且以下运算符不能重载：

- `::` (作用域解析运算符)
- `.` (成员访问运算符)
- `*` (成员指针访问运算符)
- `?` (条件运算符)
- `sizeof` (大小运算符)
- `typeid` (类型信息运算符)

The 2 forms of operator override:

1. 重载为类的非静态成员函数
	- 运算符表达式左侧必须是此类的对象
	- 必须重载为成员函数：`=`, `[]`, `()`, `->`
2. 重载为非成员函数(友元全局函数)
	- 运算符表达式左侧可以是任意类型
	- 必须重载为非成员全局函数：`<<`, `>>`

考虑设计一个复数类`Complex`，使用运算符重载实现复数类对象的加法运算：

```c++
class Complex {
	private:
		int real, imag;
	public:
		Complex(int reals, int imags) : real(reals), imag(imags) {}
		~Complex() {}
		friend Complex operator + (const Complex& obj_1, const Complex& obj_2);
		void showCase() {
			cout << real << '+' << imag << 'i' << endl;
		}
		Complex& operator = (const Complex& obj) {
			if(this != &obj){	// 防止自复制
				real = obj.real;
				imag = obj.imag;
			}
			return *this;
		}
        Complex& operator += (const Complex& obj) {
        	real += obj.real;
        	imag += obj.imag;
        	return *this;
        }
};

Complex operator + (const Complex& obj_1, const Complex& obj_2) {
	return Complex(obj_1.real + obj_2.real, obj_1.imag + obj_2.imag);
}

int main() {
	Complex c_1(1, 1), c_2(2, 2), c_3(3, 3);
	(c_1 += c_2 + c_3).showCase();
}
```

---