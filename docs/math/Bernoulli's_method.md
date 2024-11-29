## **How did Bernoulli root?**

### 1.引入

[李克大](https://zh.z-lib.gs/author/李克大)*,* [李尹裕](https://zh.z-lib.gs/author/李尹裕)的《有趣的差分方程》一书中曾介绍利用差分方程进行开根近似计算的Bernoulli方法，原理类似于构造形如：
$$
F_{n+1}+pF_{n}+qF_{n-1}=0
$$
的常系数线性齐次差分方程。笔者当时阅读时认为其线性的代数结构在进行整数开方算法上具有较大的优化空间，遂在其基础上进行改造，并加以实现。

### 2.Principle

对于分式线性递推：

$$x_{n+1}=\frac{ax_{n}+b}{cx_{n}+d}$$

若存在2个实不动点$\lambda{\scriptsize 1},\lambda{\scriptsize 2}$，不妨令$\lambda{\scriptsize 1}< \lambda{\scriptsize 2}$，则有：

$$\frac{x_{n+1}-\lambda _{1}}{x_{n+1}-\lambda _{2}}=\frac{a-c\lambda _{1}}{a-c\lambda _{2}}\cdot \frac{x_{n}-\lambda _{1}}{x_{n}-\lambda _{2}}$$

设：$a_{0}=\frac{x_{0}-\lambda _{1}}{x_{0}-\lambda _{2}},q=\frac{a-c\lambda _{1}}{a-c\lambda _{2}}$，则有：

$$x_{n}=\frac{\lambda _{2}-\lambda _{1}}{a_{0}q^{n}-1}+\lambda _{2}$$

当$\left | q \right | > 1$时，$\lim_{n \to +\infty} x_{n}=\lambda _{2}$，

当$\left | q \right | < 1$时，$\lim_{n \to +\infty}x_{n}=\lambda_{1}$。

设不动点$\lambda_{1},\lambda _{2}$满足方程：

$$cx^{2}+(d-a)x-b=0$$

其中：

$$\lambda _{1}=\frac{-(d-a)-\sqrt{\Delta } }{2c} ,\lambda _{2}=\frac{-(d-a)+\sqrt{\Delta } }{2c}$$

当$n$一定时，$q$越大，$\left | x_{n}-\lambda _{i} \right |$越小。所以有：

$$q=\frac{a+d+\sqrt{\Delta}}{a+d-\sqrt[]{\Delta}}$$

我们令：$a=0,b=\frac{m-\left \lfloor \sqrt{m}  \right \rfloor^{2}}{4},c=1,d=\left \lfloor \sqrt{m}  \right \rfloor$。则有：

$$x_{n+1}=\frac{m-\left \lfloor m \right \rfloor^{2} }{4(x_{n}+\left \lfloor m \right \rfloor )}$$

$$q=\frac{\left \lfloor \sqrt{m}  \right \rfloor+\sqrt{m}  }{\left \lfloor \sqrt{m}  \right \rfloor-\sqrt{m}  }$$

最后得到$\sqrt{m}$的近似值为：$2x_{n}+\left \lfloor \sqrt{m}  \right \rfloor$。实际上$2x_{n}$为$\sqrt{m}$小数部分的近似值。

不难看出：当$n$趋近于无穷时，$2x_{n}+\left \lfloor \sqrt{m}  \right \rfloor$无限趋近于$\sqrt{m}$。

### 3.Example

$eg.求\sqrt{114514}近似值。$

$\sqrt{114514}$的整数部分为$338$，构造数列：

$$x_{n+1}=\frac{270}{4(x_{n}+338)}$$

选取初值条件：$x_{0}=1$

选取小数点后六位：

$$x_{1}=0.199115,2x_{1}+338=338.398230$$

$$x_{2}=0.199587,2x_{2}+338=338.399174$$

$$x_{3}=0.199586,2x_{3}+338=338.399172$$

由计算工具得：$\sqrt{114514}=338.399172$

### 4.代码实现

分式线性递推：
$$
x_{n+1}=\frac{ax_{n}+b}{cx_{n}+d}
$$
令$x_{n}=\frac{F_{n}}{F_{n-1}} $，则有：
$$
\frac{F_{n+1}}{F_{n}}=\frac{aF_{n}+bF_{n-1}}{cF_{n}+dF_{n-1}}  
$$
可写作：
$$
\begin{pmatrix}
 F_{n+1}\\F_{n}
\end{pmatrix}
=
\begin{pmatrix}
 a & b\\
 c & d
\end{pmatrix}
\cdot 
\begin{pmatrix}
 F_{n}\\F_{n-1}
\end{pmatrix}
$$
进一步地：
$$
\begin{pmatrix}
 F_{n}\\F_{n-1}
\end{pmatrix}
=
\begin{pmatrix}
 a & b\\
 c & d
\end{pmatrix}^{n}
\cdot 
\begin{pmatrix}
 F_{1}\\F_{0}
\end{pmatrix}
$$

给定精度$\delta$，当$|x_{n}-x_{n-1}|<\delta $时将$2x_{n}+\left \lfloor \sqrt{m}  \right \rfloor$作为$\sqrt{m}$的近似值。

用C++实现一个Martix类，实现矩阵的构造，析构，乘法，幂运算。

#### 4.1.类的声明

```c++
#define rows 2
#define cols 2
#define SIZE 2
class Martix{
    public:
        Martix():row(rows),col(cols){}
        ~Martix()；
        void Cre_Martix();	
        void Multi_Martix();
        void Pow_Martix();
    private:
        int **data;
};
```

#### 4.2.矩阵的构造

```c++
void Martix::Cre_Martix(){
    int **data = new int*[cols];
    for(int i = 0;i < col;i ++)
        data[i] = new int[rows];
}
```

#### 4.3.矩阵的析构

```c++
Martix::~Martix(){
    for(int i = 0;i < rows;i ++)
   		delete[] data[i];
    delete[] data;
}
```

#### 4.4.矩阵的乘法

```c++
void Martix::Multi_Martix(int **p,int **q,int **result) {
    int temp[rows][cols] = {{0, 0}, {0, 0}};
    for (int i = 0;i < SIZE;i ++) {
        for (int j = 0;j < SIZE;j ++) {
            temp[i][j] = 0;
            for (int k = 0;k < SIZE;k ++) {
                temp[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    for (int i = 0; i < SIZE;i ++) {
        for (int j = 0; j < SIZE;j ++) {
            result[i][j] = temp[i][j];
        }
    }
}
```

#### 4.5.矩阵的幂

这里可以使用快速幂来优化算法。

```c++
void Martix::Pow_Martix(int **p, int n, int **result) {
    int identity[SIZE][SIZE] = {{1, 0}, {0, 1}};
    for (int i = 0;i < SIZE;i ++) {
        for (int j = 0;j < SIZE;j ++) {
            result[i][j] = identity[i][j];
        }
    }
    while (n > 0) {
        if (n % 2 == 1) Multi_Martix(result,A,result);
        Multi_Martix(A,A,A);
        n /= 2;
    }
}
```

#### 4.6.二分法计算$\left \lfloor \sqrt{m}  \right \rfloor$

```c++
int Int_Sqrt(int n) {
    int low = 0, high = n, result = 0;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if ((long long)mid * mid <= n) { 
            result = mid;
            low = mid + 1;
        } 
        else	high = mid - 1;
    }
    return result;
}
```

### 5.时间复杂度分析

$x_{n}$的通项公式为：
$$
x_{n}=\frac{\lambda _{2}-\lambda _{1}}{a_{0}q^{n}-1}+\lambda _{2}
$$
要使$|x_{n}-x_{n-1}|<\delta$，则有：
$$
a_{0}q^{n+1}+\frac {1}{a_{0}q^{n}}>O(\frac {1}{\delta})
$$
所以要实现精度$\delta$，且使用快速幂，求解$x_{n}$的时间复杂度为：
$$
O(log(log\frac {1}{\delta}))
$$
使用二分法估计整数部分的时间复杂度为：
$$
O(logn)
$$
