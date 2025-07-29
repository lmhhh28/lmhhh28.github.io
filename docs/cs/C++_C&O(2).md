# **C++.继承与多态**

---

## **1.继承(Inheritance)**

基类(Base Class):

```c++
class Shape {
	private:	// 派生类不可访问
		string shapeName;
	protected:	// 派生类可访问
		int positionX, positionY;
	public:
		void setName(const string& name);
		float area();
		void draw();
};
```

派生类(Derived Class):

```c++
class Circle: public/protected/private Shape {
	private:
    	float radius;
    public:
    	float area();
    	void draw();
};
```

- 不可被继承：
      1. `构造函数/析构函数；`
      2. `重载运算符成员；`
      3. `类的友元；`

Constructor and Destructor 的调用：

While the constructor of the subClass is called, under no circumstance dose the constructor of baseClass is called.

- 无参/默认构造函数

```c++
class innerClass {
	public:
		innerClass() {
			std::cout << "calling to innerClass constructor" << std::endl;
		}
		~innerClass() {
			std::cout << "calling to innerClass destructor" << std::endl;
		}
};

class baseClass {
	private:
		innerClass innerBase;
	public:
		baseClass() {
			std::cout << "calling to baseClass constructor" << std::endl;
		}
		~baseClass() {
			std::cout << "calling to baseClass destructor" << std::endl;
		}
};

class subClass : public baseClass {
	private:
		innerClass innerSub;
	public:
		subClass() {
			std::cout << "\tcalling to subClass constructor" << std::endl;
		}
		~subClass() {
			std::cout << "\tcalling to subClass destructor" << std::endl;
		}
};
```

- 有参数构造函数(base class)

```c++
class baseClass {
	public:
		baseClass(int val);
};

class subClass: public baseClass {
	public:
		subClass : baseClass(0) {}
}
```

When we creat a object of `subClass`, it's base class's constructor will be call to first.

```
calling to innerClass constructor
        calling to baseClass constructor
calling to innerClass constructor
                calling to subClass constructor
                calling to subClass destructor
calling to innerClass destructor
        calling to baseClass destructor
calling to innerClass destructor
```

在继承类`subClass`中，首先会构造基类`baseClass`，其次会构造内嵌类`innerClass`，最后构造自身`subClass`。析构的顺序相反。

---

## **2.多态(Polymorphism)**

- 成员函数的重写(Override)

```c++
class baseClass {
	public:
		void greet() {
			cout << "this is baseClass" << endl;
		}
};

class subClass:public baseClass{
	public:
		void greet() {
			cout << "this is subClass" << endl;
		}
};

int main() {
	subClass obj;
	baseClass* ptr_base = &obj;
	baseClass& ref_base = obj;
	
	obj.greet();
	ptr_base->greet();
	ref_base.greet();
}
```

**指向`subClass`对象的`baseClass`类型指针只能访问`baseClass`中的成员。**

So the result of running:

```
this is subClass
this is baseClass
this is baseClass
```

- 虚函数(Virtual Function)

在`baseClass`中的`greet`函数前加上`virtual`关键字，调用`subClass`中的`greet`函数。

```c++
class baseClass {
	public:
		virtual void greet();
};
```

The result of running:

```plaintext
this is subClass
this is subClass
this is subClass
```

虚函数提供了一种特殊接口，指向继承类对象的基类类型指针可以通过虚函数访问继承类的Override函数。

```c++
class Animal {
  	protected:	// we hope we can't call these interface function directly
    	virtual void makeSound() {}
    	// ......
};

class Dog : public Animal {
    protected:
    	void makeSound() override {
            cout << "dog's sound" << endl;
        }
};

class Cat : public Animal {
    protected:
    	void makeSound() override {
            cout << "cat's sound" << endl;
        }
};

class Sheep: public Animal{
    protected:
    	void makeSound() override {
            cout << "sheep's sound" << endl;
        }
};
```

通过虚函数提供的统一的指针类型形式，考虑设计一个统一的接口函数访问继承类下的Override函数。

```c++
void playSound(Animal* ptr) {
    ptr->makeSound();
}
```

- 纯虚函数(Pure Virtual Function)

```c++
class Animal {
  	protected:
    	virtual void makeSound() = 0;
    	virtual ~Shape() {}	 // 通过虚函数调用继承类的析构函数完成对继承类对象的虚构。
    	// ......
};
```

若基类包含上述纯虚函数，则称为抽象基类(Abstract Base Class)或者接口类(Interface Class)。在继承类中虚函数对应的接口函数将强制要求重载实现。且抽象基类不可被实例化。

---

