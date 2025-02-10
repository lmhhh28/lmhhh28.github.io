# **C++.Class and Object(3)**

---

## **1.override & final(C++ 11)**

- `override`:检查派生类重载函数类型是否与基类对应虚函数一致。

- `final`:限制虚函数的重写与类的继承。
      - `void foo() override final;`
      - `class subClass final: public baseClass`

---

## **2.static**

- 静态全局变量(Static Global Variable)

当`static`用来修饰全局变量或函数时，表示这些变量或函数的作用域仅限于当前的源文件(文件内链接)。

隐藏符号：外部文件无法访问这个变量或函数。
局部化作用域：即使是全局变量，它也只能在声明它的文件中使用。

- 静态局部变量(Static Local Variable)

`static`修饰的局部变量其作用域依然是局部的，但是其生命周期变为了程序的生命周期。

For example:

```c++
void func() {
    static int count = 0;  // 只初始化一次
    count++;
    cout<<count<<endl;
}

auto main() {
    func();
    func();
    func();
}
```

The result of running:

```
1
2
3
```

- 静态成员变量(Static Member Variable)

静态成员变量存储在全局区，非对象的成员内存中，静态成员变量在内存中只有一份拷贝。故静态成员变量的内存区域所有对象共享。

For example:

```c++
class Test{
	public:
		static int count;
		Test(){
			count ++;
		}
};

int Test::count = 1	// 在类外定义并初始化静态成员变量

auto main(){
	Test::count = 2;	// 在类外修改静态成员变量的值
	Test test_1;
	test_1.count = 1;	// 可通过类对象访问
	Test test_2;
	cout<<Test::count<<endl;
}
```

The result of running:`2`.

- 静态成员函数(Static Member Function)

静态成员函数不依赖于类实例的创建，在对象之间共享。

```c++
class MyClass {
public:
    static int count;
    MyClass() { count++; }
    ~MyClass() { count--; }

    static void showCount() {  // 静态成员函数
        cout << "Current object count: " << count << endl;
    }
};

int MyClass::count = 0;	// 静态成员变量初始化

auto main(){
    MyClass::showCount();	// 直接通过类名调用，不依赖于实例的构建
	MyClass obj_1;
    MyClass obj_2;
    obj_2.showCount();	// 通过类对象调用
	{
        MyClass obj_3;
        MyClass::showCount();
    }	// destructor was called
	MyClass::showCount();
}
```

The result of running:

```
0
1
2
3
2
```

---

## **3.const**

- 全局`const`变量

```c++
const int g = 10;
```

全局`const`变量由编译器为其分配内存，储存在全局区的`.rodate`的只读数据段，不为编译期已知。

For example:

```c++
int arr[g];  // ❌ 非法，g 不是编译期常量
constexpr int g2 = 10;	// g2 为编译期时已知
int arr2[g2];  // ✅ 可以
```

- 局部`const`变量

若修饰**整型变量**，通常情况下不会为其分配内存，值在编译时确定，采用Constant Propagation技术，使得`const`更像宏定义`#define`，而不是普通的变量。

```c++
void func() {
    const int x = 10;
    int y = x + 5;  // 编译器优化：直接替换为 int y = 10 + 5
}
```

以下情况编译器变量会为局部`const`变量分配地址，一般储存在栈上。

1. 修饰的局部变量为浮点型变量
      - 浮点类型可能会涉及浮点数运算，因此不为编译期常量。
2. 取地址`&`运算

- `const`成员变量

`const`成员变量在对象生命周期内不可修改，它们通常用于表示对象的常量属性。必须通过构造函数的初始化列表进行初始化，储存在对象内部内存中。

For example:

```c++
class Test {
	public:
		const int val;
		Test(int vals):val(vals) {}
};

auto main(){
	Test test_1(1);
	Test test_2(2);
}
```

- `const`成员函数

```c++
class Test {
    private:
    	int val_1;
    	mutable int val_2;
    public:
    	void getValue() const {
            return val;
        }
    	// 检查不会修改成员变量的值
    	void mutValue(int vals) const {
            val_2 = vals;
        }
    	// mutable修饰的成员变量可被const成员函数修改
};
```

1. `const`修饰的成员函数无法调用非`const`成员函数。
2. `mutable`修饰的成员变量可被`const`成员函数修改。

---

## **4.constexpr**

- `constexpr`修饰符

`constexpr`修饰符是更为严格的`const`，规定其修饰的变量(不论是整型还是浮点型)在编译期确定其值。

`constexpr`变量不会被分配内存，即使对它进行取地址`&`运算。

由于在编译的时候要确定`constexpr`变量的值，因此`constexpr`成员变量必须在类内完成初始化。

`constexpr`成员变量为实例级常量，必须通过对象访问。

```c++
class Test {
	public:
		constexpr double val = 42;
};

auto main(){
	Test test_1;
	Test test_2;
	int val_1 = test_1.val;
	int val_2 = test_2.val;
}
```

- `static const`修饰

由于`const`修饰的整型变量并不强制要求在编译期确定其值，因此在`static const`修饰下的整型变量既可以在类内完成初始化(不分配内存)，也可以在类外完成初始化(分配内存)。

`static const`修饰下的浮点变量无法在编译期确定其值，必须在类外完成初始化(分配内存)

`static const`成员变量为类级常量，可通过类名访问。

```c++
class Test {
	public:
		static const int val_1 = 42;	// 在编译期完成初始化
		static const double val_2;	// 无法在编译期完成初始化
};

double Test::val_2 = 43;		//在类外完成定义与初始化

auto main(){
	Test test;
	int val_1 = test.val_1;
	double val_2 = test.val_2;
}
```

- `static constexpr`修饰

`constexpr`强制要求变量在编译期求值，`static constexpr`成员变量必须在类内完成初始化。

```c++
class Test {
	public:
		static const int val_1 = 42;	// 在编译期完成初始化
		static const double val_2;	// 无法在编译期完成初始化
		static constexpr double val_3 = 44;	// 在编译期完成初始化
};

double Test::val_2 = 43;		//在类外完成定义与初始化

auto main(){
	Test test;
	int val_1 = test.val_1;
	double val_2 = test.val_2;
	double val_3 = test.val_3;
}
```

---

## **5.Summary**

|       Index        |       在编译期求值       | 分配内存 | 在类内完成初始化 | 作用域 |
| :----------------: | :----------------------: | :------: | :--------------: | :----: |
|      `static`      |            ❌             |    ✅     |        ❌         | Class  |
|      `const`       | ✅局部整型(非强制),❌Other |    ✅     |        ❌         |  Obje  |
|    `constexpr`     |            ✅             |    ❌     |        ✅         | Object |
|   `static const`   |   ✅整型(非强制),❌Other   |    ✅     |   ✅整型,❌Other   | Class  |
| `static constexpr` |            ✅             |    ❌     |        ✅         | Class  |



---

