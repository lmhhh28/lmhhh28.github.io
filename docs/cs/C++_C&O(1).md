

# **C++.Class and Object(1)**

---

## **1.Access Control Symbol**

(访问控制符)

Form:

```c++
class ClassName{
    member variable_0;	// default as private member variable
    private:
    	member variable_1;
    	member function_2();
    protected:	// the inherited class can also access
    	member variable_3;
    	member function_4();
    public:
    	member variable_5;
    	member function_6();
};
```

For example:

```c++
class Shape{
	protected:
    	std::string shapeName;
    private:
    	int positionX,positionY;
    public:
    	const string& getName(){return shapeName;}	// "const": we can't modify the private variable "shapeName" through it's reference
    	setName(const string& name){shapeName = name;}
}
```

---

## **2.Constructor and Destructor**

(构造函数与析构函数)

### **(1).Default Constructor**

(默认构造函数)

```c++
auto main(){
	Shape obj_1;
	obj_1.setName("obj_1");
}
```

In the code above, there is no definition of constructor function, the complier will create a default constructor automatically to allocate memory for the object you define. 

But in the code below, **if a constructor with parameters has been defined, we have to define our default constructor manually**.

For example:

```c++
class Shape(){
	public:
		Shape(){};
		Shape(int x,int y):positionX(x),positionY(y){}
};

auto main(){
	Shape obj_2(1,2);	 //"Shape obj_2()" is not viable, the complier will consider "obj_2()" as a function with return type of "Shape".
	obj_2.setName("obj_2");
}
```

In some cases, we will call constructor or it's default constructor.

1. Use it's type of class name
      - `Shape obj_1;	// call to it's default constructor`
      - `Shape obj_2(1,2);	// call to it's constructor with parameters`
2. Use `new` to allocate memory for a ptr to the class itself
      - `Shape* ptr_1 = new Shape();	// call to it's default constructor`
      - `Shape* ptr_2 = new Shape(1,2);	// call to it's constructor with parameters`

### **(2).Copy Constructor**

(拷贝构造函数)

For example:

```c++
class Shape{
	private:
		int positionX,positionY;
	public:
		Shape(const Shape& other);
};
```

The compiler will create a default copy constructor if you encounter these behaviors below without defining it.

1. Init a new object through a existed object:
      - `Shape obj_2(obj_1); or Shape obj_2 = obj_1;`
2. Be delivered to a function as its parameter:
      - `foo(obj_1);`
3. construct and return a object:
      - `Shape obj_3;	return obj_3;`

In some cases, we hope we can copy a value pointed by a ptr. But in the default copy constructor we can only copy the value of it's ptr not the things it points to. We call it **Shallow Cpoy**(浅拷贝). 

```c++
class Shape{
	private:
		int* ptr;
	public:
		Shape(int val){ptr = new int(val);}
		Shape(const Shape& other){ptr = other.ptr}
}

auto main(){
	Shape obj_1(1);
	Shape obj_2(obj_2)
}
```

In the code above, `obj_1.ptr` and `onj_2.ptr` point to the same area in the memory. To copy the area in the memory, we have to allocate a new area for the target object. We called it **Deep Copy**(深拷贝). 

`Shape(const Shape& other){ptr = new int(*other.ptr);}` 


