# **C++.模板**

---

函数模板通过实现类型参数化，旨在实现同类代码重用。

- 模板关键字：`template<class T_1, class T_2 ...>`；
- 模板在编译期处理，只有在实例化后才会产生代码；
- 函数模板支持重载。

---

## **1.函数模板**

- 隐式实例化

以下将相同功能的`swap`函数模板化隐式实例化：

```c++
template <class T>
void swapTest(T& a, T& b) {
	T temp = a;
	a = b;
	b = temp;
}

auto main() {
	int a = 2, b = 3;
	swapTest(a, b);	// 不指定类型实例化，在编译期进行。
	cout << a << '\n' << b << endl;
}
```

- 显式实例化：

显式实例化指显式请求编译器生成模板代码，例如有以下函数模板：

```c++
template <class T>
void swapTest(T& a, T& b) {
	T temp = a;
	a = b;
	b = temp;
}	// 定义函数模板

template void swapTest<int>(int& a, int& b);	
// 通过声明告诉编译器生成指定类型的函数。
```

- 特化(Specialization)

函数模板的特化分为**完全特化(Full Specialization)**与**偏特化(Partial Specialization)**。完全特化指对某**种**特殊类型的特化，偏特化指对某**类**特殊类型的特化。

以下代码展现了类模板的完全特化与偏特化：

```c++
template <class T>	// 基本类型模板
void print(T val) {
	cout << "general val: " << val << endl;
}

template <>	// 完全特化
void print<int>(int val) {
	cout << "int val: " << val << endl;
}

template <>
void print<double>(double val) {
	cout << "double val" << val << endl;
}

template <class T>	 // 偏特化
void print(T* val) {
	cout << "ptr val" << *val << endl;
}

// template <class T>
// void print(T& val) {
//	 cout << "ref val" << val << endl;
// }

auto main() {
	int val_1 = 1;
	double val_2 = 2;
	int* val_3 = &val_1;
	double* val_4 = &val_2;
	int& val_5 = val_1;
	double& val_6 = val_2;
	
	print(val_1);
	print(val_2);
	print(val_3);
	print(val_4);
	// print(val_5);
	// print(val_6);
}
```

The result of running:

```
int val: 1
double val: 2
ptr val: 1
ptr val: 2
// ref val: 1
// ref val: 2
```

---

## **2.类模板**

类模板（Class Template）是C++中的一种泛型编程特性，允许你为类定义一个模板，使得同一份代码能够处理不同类型的数据。它类似于函数模板，但用于类的定义。通过类模板，可以在编译时动态地决定类所操作的数据类型，从而提高代码的复用性和灵活性。

Form:

```c++
template <class T>
class Test {
	private:
		T val;
	public:
		Test(T vals) : val(vals) {}
		T getVal() { return val; }
};

auto main() {
	Test<int> test(42);
	int val = test.getVal();
}
```

类模板同时也可传入多个参数：

```c++
template <typename T1, typename T2>
class Pair {
private:
    T1 first;
    T2 second;
public:
    Pair(T1 f, T2 s) : first(f), second(s) {}
    T1 getFirst() { return first; }
    T2 getSecond() { return second; }
};

auto main() {
    Pair<int, double> p1(1, 2.5);
}
```

类模板**只允许显式实例化**，即实例化类对象时要确定传入的类型。

- 类模板特化

```c++
// 通用模板
template <class T>
class Test {
	private:
		T val;
	public:
		Test(T vals) : val(vals) {
			cout << "this is a general val: " << val << endl;
		} 
};
//对int类型的完全特化
template <>
class Test<int> {
	private:
		int val;
	public:
		Test(int vals) : val(vals) {
			cout << "this is an int val: " << val << endl;
		}
};
//对指针类型的偏特化
template <class T>
class Test<T*> {
	private:
		T* val;
	public:
		Test(T* vals) : val(vals) {
			cout << "this is a ptr val: " << val << endl;
		}
};

auto main() {
	Test<int> test_1(42);
	Test<double> test_2(43);
	Test<int*> test_3(0);
}
```

The result of running:

```
this is an int val: 42
this is a general val: 43
this is a ptr val: 0
```

- 类模板的继承与多态

类模板的继承与多态特性是C++模板编程中非常重要的概念。通过合理的设计，可以使模板类具备继承和多态的能力，从而提高代码的灵活性和可扩展性。

```c++
template <class T, class U>
class baseClass {
	public:
		T val_1;
		U val_2;
		baseClass(T vals_1, U vals_2) : val_1(vals_1), val_2(vals_2) {}
};

template <class T, class U>
class subClass : public baseClass<T, U> {
	public:
		subClass(T vals_1, U vals_2) : baseClass<T, U>(vals_1, vals_2) {}
};

auto main() {
	subClass<int, double> d(42, 3.14);
    return 0;
}
```

同样继承类也可以进行特化：

```c++
template <>
class subClass : public baseClass<int, double> {
	public:
		subClass(int vals_1, double vals_2) : baseClass<int, double>(vals_1, vals_2) {}
};
```

在类模板的多态中，考虑设计一个模板接口函数接收各种类型的基类类型指针。

```c++
#include <iostream>

template <class T>
class baseClass {
public:
    static constexpr T val = 42;
    virtual void showCase() = 0;
    virtual ~baseClass() {}
};

template <class T>
class subClass_1 : public baseClass<T> {
protected:
    void showCase() override {
        std::cout << "This is subClass_1 " << typeid(T).name() << " :" << this->val << std::endl;
    }
    ~subClass_1() {}
};

template <class T>
class subClass_2 : public baseClass<T> {
protected:
    void showCase() override {
        std::cout << "This is subClass_2 " << typeid(T).name() << " :" << this->val << std::endl;
    }
    ~subClass_2() {}
};

template <class T>
class subClass_3 : public baseClass<T> {
protected:
    void showCase() override {
        std::cout << "This is subClass_3 " << typeid(T).name() << " :" << this->val << std::endl;
    }
    ~subClass_3() {}
};

template <class T>
void print(baseClass<T>* ptr) {
    ptr->showCase();
}

int main() {
    baseClass<int>* ptr_1 = new subClass_1<int>();
    baseClass<double>* ptr_2 = new subClass_2<double>();
    baseClass<int>* ptr_3 = new subClass_3<int>();

    print(ptr_1);
    print(ptr_2);
    print(ptr_3);
}
```

The result of running:

```
This is subClass_1 i :42
This is subClass_2 d :42
This is subClass_3 i :42
```

---

- 类模板的递归

类模板不仅可以将类型作为参数传入，还可以将**数**作为参数传入。

```c++
template <int N>
class Test {
	public:
		static constexpr int val = N;
};
```

因为类模板的实例化发生在编译期，考虑在编译期利用类模板完成一定的计算：

```c++
#include <iostream>

template <int N>
class Fac {
	public:
		static constexpr long long val = N * Fac<N - 1>::val;
};

// 利用特化完成类模板递归的终点

template <>
class Fac<0> {
	public:
		static constexpr long long val = 1;
};

auto main() {
	std::cout << Fac<10>::val << std::endl;
}
```

The result of running:

`3628800`

---
