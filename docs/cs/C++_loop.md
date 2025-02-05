# **1.C++.基于范围的for循环**

---

Form:

```c++
for(element:list){	// list is a ptr to a list/vector.
    // loop body
}
```

For example:

```c++
int numbers[] = {1,2,3,4,5,6,};
for(auto number:numbers){	// "auto" means that the compiler will infer the type of "numbers".
    cout<<number<<' ';
}
```

The result of running the code is:`1 2 3 4 5 6 ` .

The codes above is equivalent to:

```c++
for(int i = 0;i < sizeof(numbers);i ++){
	cout<<numbers[i]<<' ';
}
```

---

