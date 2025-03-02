# **C++.namespace**

---

在C++中，命名空间(Namespace) 是一种用于组织代码、避免命名冲突的机制。它通过将代码实体(如变量、函数、类等)封装在特定作用域内，实现对不同模块或库中同名标识符的区分。

---

## **1.定义与访问**

运用`namespace`关键字定义命名空间：

```c++
namespace MyNamespace {
	int val;
	void func();
	int foo() { return 0; }
	class MyClass { /*......*/ };
	namespace InnerNamespace {
		int InnerVal;
		int foo() { return 1; }
	}
}
```

可使用域解析符`::`访问命名空间中的成员：

```c++
MyNamespace::val = 42;
MyNamespace::InnerNamespace::InnerVal = 43;
```

类`MyNamespace::val`的命名称为限定名(Qualified Name)。

C++17中支持更加精简的嵌套定义：

```c++
namespace MyNamespace::InnerNamespace {
	int InnerVal;
}
```

也可完成对命名空间中的成员函数的定义(内联函数需在命名空间内部完成定义)：

```c++
void MyNamespace::func() {
	std::cout << "hello,world!" << std::endl;		
}
```

---

## **2.别名调用**

使用`namespace`关键字定义已知命名空间别名，并且可通过此别名访问该命名空间中的成员。

```c++
namespace MI = MyNamespace::InnerNamespace;
std::cout << MI::InnerVal << std::endl;
```

---

## **`using`编译指令**

`using`指令用于**在该作用域内**引入指定该命名空间的某个成员或者所有成员。

- 引入单个名称：

```c++
using MyNamespace::InnerNamespace::InnerVal;
std::cout << InnerVal << std::endl;	// 无需域解析符
```

- 引入命名空间：

如需仅引入外层命名空间，则仍需域解析符访问内层命名空间中的成员：

```c++
using namespace MyNamespace;
std::cout << foo() << std::endl;
std::cout << InnerNamespace::foo() << std::endl;
```

也可引入内层命名空间：

```c++
using namespace MyNamespace::InnerNamespace;
std::cout << foo() << std::endl;
std::cout << MyNamespace::foo() << std::endl;
```

---