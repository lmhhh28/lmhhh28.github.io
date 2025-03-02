# **C++.Exception**

---

C++中的异常处理是一种错误处理机制，允许程序执行过程中发生错误时转移到专门处理错误的代码中。

当程序遇到内存分配错误，文件无法打开等异常时，可以继续运行抛出错误，而不是直接崩溃。

---

## **1.Grammar**

异常处理的核心组件：

- `try`块：可能抛出异常的代码。
- `throw`语句：用于抛出相关异常。
- `catch`块：用于捕获并处理相关异常。

For example:

```c++
int main() {
	try {
		int num;
		cin << num;
		if(num == 1) {
			throw 42;	// 抛出整数异常
		} else if(num == 2) {
			throw "String Exception!";	// 抛出字符串异常
		} else {
			throw runtime_error("Unknown Exception!");	// 抛出标准异常
		}
	}
	catch(const int error) {
		cout << "caught int exception: " << error << endl;
	}
	catch(const char* error) {
		cout << "caught string exception: " << error << endl;
	}
	catch(const exception& error) {
		cout << "caught standard exception: " << e.what() << endl;
	}
	return 0;
}

```

The result of running:

```
2
caught string exception: String Exception!
```

---

## **2.标准异常类**


C++中的标准异常类提供统一的异常处理接口，并且可以通过继承类自定义异常类。

常用标准异常类(`std::exception`类的派生)：
- `std::logic_error`：逻辑错误。
- `std::runtime_error`：运行时错误。
- `std::bad_alloc`：内存分配失败。

以下是`std::exception`基类的大致实现：

```c++
namespace std {
	class exception {
		exception() noexcept {}
		virtual ~exception() noexcept {}
        virtual const char* what() const noexcept;
	};
}

int main() {
	try {
		throw std::exception();
	}
	catch(const std::exception& error) {
		std::cout << "Default Exception: " << error.what << std::endl;
	}
	return 0;
}
```

`std::exception`基类中的虚函数`what()`非纯虚函数，有相关的默认实现，返回一个实现定义的字符串`"std::exception"`。

The result of running:

```
Default Exception: std::exception
```

可以自定义`std::exception`的派生类，重写基类中的`what()`。

For example:

```c++
class my_exception : public std::exception {
	private:
		std::string message;
	public:
		my_exception(const std::string& msg) : message(msg) {}
		~my_exception() {}
		const char* what() const noexcept override {	// 重写虚函数时，限定符必须保持一致。
            return message.c_str();
        }
};

int main() {
	try {
		throw my_exception("This is custom exception!");
	}
	catch(const std::exception& error) {
		std::cout << "my_exception: " << error.what() << std::endl;
	}
	return 0;
}
```

The running of result:

```
my_exception: This is custom exception!
```

---

## **3.栈回卷(Stack Unwinding)**

在复合调用的函数中若抛出异常，会向上匹配相关的`catch`块，在此过程中堆栈回卷，析构相关的局部资源。

若未匹配到相关的`catch`块，则调用`std::terminate`直接终止程序的运行，不进行堆栈回卷和析构局部资源。

For example:

```c++
void fun_3() {
    Test test_3(3);
    throw std::runtime_error("runtime_error in fun_3!");
}

void fun_2() {
    Test test_2(2);
    try {
        fun_3();
    }
    catch(const my_exception& error) {
        std::cout << error.what() << std::endl;
    }
    throw my_exception("my_exception in fun_2");
}

void fun_1() {
    Test test_1(1);
    try {
        fun_2();
    }
    catch(const my_exception& error) {
        std::cout << error.what() << std::endl;
    }
    throw my_exception("my_exception in fun_1");
}

int main() {
    try {
        fun_1();
    }
    catch(const std::exception& error) {
        std::cout << error.what() << std::endl;
    }
}
```

The result of running：

```
creating: 1
creating: 2
creating: 3
releasing: 3
releasing: 2
releasing: 1
runtime_error in fun_3!
```

由此看出，堆栈回卷和函数调用存在本质区别，堆栈回卷过程中不会执行后续的代码，会直接跳转的相关匹配的catch块。

---

## **4.异常处理表(EH Table)**

C++中的异常处理表记录了代码中的`try`块的覆盖范围以及`catch`块的类型信息，在函数抛出异常时能够匹配到相关的`catch`块，正确执行堆栈回卷，析构局部对象。

- 具体步骤：
      1. 中断当前执行流，捕获异常对象以及其类型信息。
      2. 逆向遍历调用栈，逐层向上查找匹配的`catch`块。
      3. 查询异常处理表：检查当前函数的指令指针是否在某个`try`块的`start_ip`和`end_ip`范围内。若在范围内，依次匹配该`try`块关联的`catch`块类型：
        - 若类型匹配(如`catch (T)`匹配抛出的异常类型`T`或其派生类)，触发堆栈回卷并跳转到该`catch`块。
        - 若不匹配，继续向上层栈帧查找。
      4. 若未找到匹配的`catch`块，调用`std::terminate()`终止程序。

当无匹配的`catch`块时，会直接调用`std::terminate()`终止程序，不会执行堆栈回卷。

For example:

```c++
#include <iostream>
#include <stdexcept>

void inner() {
    throw std::runtime_error("Error"); // 抛出异常
}

void outer() {
    try {
        inner();
    } catch (int e) { // ❌ 类型不匹配
        std::cout << "Caught int\n";
    }
}

int main() {
    try {
        outer();
    } catch (const std::exception& e) { // ✅ 类型匹配
        std::cout << "Caught exception\n";
    }
    return 0;
}
```

运行时行为：

1. `inner()` 抛出 `std::runtime_error` 异常。
2. 运行时从 `inner()` 的栈帧开始查找异常处理表，但 `inner()` 无 `try` 块。
3. 向上到 `outer()` 的栈帧，发现其 `try` 块覆盖了 `inner()` 的调用位置。
   - 检查 `catch (int e)`，类型不匹配。
4. 继续向上到 `main()` 的栈帧，发现其 `try` 块覆盖了 `outer()` 的调用位置。
   - 检查 `catch (const std::exception& e)`，类型匹配。
5. 触发堆栈回卷，析构 `outer()` 和 `inner()` 的局部对象，执行 `main()` 的 `catch` 块。

- 性能开销：

空间开销：异常处理表会增加二进制文件的大小（尤其是包含大量 try/catch 的代码）。

时间开销：运行时遍历调用栈并查询异常处理表有一定开销，但现代编译器（如 GCC、Clang）对
此高度优化。

某些编译器（如 MSVC）默认使用 Zero-Cost Exception Handling 策略：

- 无异常时零开销：正常执行路径不携带异常处理信息。
- 异常时代价较高：抛出异常时需动态生成堆栈回卷信息。

---

