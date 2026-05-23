// Corrigé — Mathématiques A — BANQUE PT 2026
(function () {
  const ep = CATALOGUE.find(e => e.id === 'maths1');
  if (!ep) return;

  ep.mu    = 8.41;
  ep.sigma = 4.21;

  ep.parties = [
    // ── PARTIE A ────────────────────────────────────────────────────────────
    {
      id: 'partieA',
      titre: 'Partie A — Quelques matrices',
      points: 40,
      questions: [
        {
          num: '1',
          enonce: 'Rappeler la caractérisation des matrices trigonalisables à l\'aide du polynôme caractéristique.',
          corrige: '<p>Une matrice $M \\in \\mathcal{M}_n(\\mathbb{K})$ est <strong>trigonalisable dans $\\mathcal{M}_n(\\mathbb{K})$</strong> ssi son polynôme caractéristique est <strong>scindé sur $\\mathbb{K}$</strong>.</p><p>Tout polynôme est scindé sur $\\mathbb{C}$ (TFA) donc toute matrice est trigonalisable dans $\\mathcal{M}_n(\\mathbb{C})$.</p>'
        },
        {
          num: '2',
          enonce: '$M_1 = \\begin{pmatrix}2&6\\\\1&1\\end{pmatrix}$ — Diagonalisable dans $\\mathcal{M}_2(\\mathbb{C})$ ? dans $\\mathcal{M}_2(\\mathbb{R})$ ? Déterminer $P_1$, $D_1$.',
          corrige: '<p>$\\chi_{M_1}(\\lambda) = (2-\\lambda)(1-\\lambda)-6 = \\lambda^2-3\\lambda-4 = (\\lambda-4)(\\lambda+1)$, $\\Delta = 25 > 0$.</p><p>Deux VP réelles distinctes ⟹ <strong>diagonalisable dans $\\mathcal{M}_2(\\mathbb{R})$</strong> (et $\\mathbb{C}$).</p><p>VP $\\lambda=4$ : $(M_1-4I)v=0 \\Rightarrow v_1=\\begin{pmatrix}3\\\\1\\end{pmatrix}$ ; VP $\\lambda=-1$ : $v_2=\\begin{pmatrix}-2\\\\1\\end{pmatrix}$</p><div class="result-box">$$P_1 = \\begin{pmatrix}3 & -2\\\\1 & 1\\end{pmatrix}, \\qquad D_1 = \\begin{pmatrix}4 & 0\\\\0 & -1\\end{pmatrix}$$</div>'
        },
        {
          num: '3',
          enonce: '$M_2 = \\begin{pmatrix}3&-2\\\\1&1\\end{pmatrix}$ — Diagonalisable dans $\\mathcal{M}_2(\\mathbb{C})$ ? dans $\\mathcal{M}_2(\\mathbb{R})$ ? Déterminer $P_2$, $D_2$ si possible.',
          corrige: '<p>$\\chi_{M_2}(\\lambda) = \\lambda^2 - 4\\lambda + 5$, $\\Delta = -4 < 0$.</p><p>VP complexes $\\lambda = 2\\pm i$ ⟹ <strong>non diagonalisable dans $\\mathcal{M}_2(\\mathbb{R})$</strong>, <strong>diagonalisable dans $\\mathcal{M}_2(\\mathbb{C})$</strong>.</p><p>VP $2+i$ : $(M_2-(2+i)I)v=0 \\Rightarrow v_1 = \\begin{pmatrix}1+i\\\\1\\end{pmatrix}$, conjugué pour $2-i$.</p><div class="result-box">$$P_2 = \\begin{pmatrix}1+i & 1-i\\\\1 & 1\\end{pmatrix}, \\qquad D_2 = \\begin{pmatrix}2+i & 0\\\\0 & 2-i\\end{pmatrix}$$</div>'
        },
        {
          num: '4',
          enonce: '(a) $M_3 = \\begin{pmatrix}5&-4\\\\1&1\\end{pmatrix}$ — diagonalisable ? trigonalisable dans $\\mathcal{M}_2(\\mathbb{R})$ ? (b) Trouver une base où la matrice de $f_3$ est $T_3 = \\begin{pmatrix}3&1\\\\0&3\\end{pmatrix}$.',
          corrige: '<p><strong>(a)</strong> $\\chi_{M_3}(\\lambda) = (\\lambda-3)^2$, $\\Delta = 0$, VP double $\\lambda_0=3$. Comme $\\mathrm{rg}(M_3-3I)=1\\neq 0$, le sous-espace propre est de dimension 1 : <strong>non diagonalisable</strong>. VP réelle ⟹ <strong>trigonalisable dans $\\mathcal{M}_2(\\mathbb{R})$</strong>.</p><p><strong>(b)</strong> Vecteur propre : $(M_3-3I)v=0 \\Rightarrow e_1=\\begin{pmatrix}2\\\\1\\end{pmatrix}$. Vecteur généralisé : $(M_3-3I)e_2=e_1 \\Rightarrow e_2=\\begin{pmatrix}1\\\\0\\end{pmatrix}$.</p><div class="result-box">Base de trigonalisation : $\\left(\\begin{pmatrix}2\\\\1\\end{pmatrix},\\;\\begin{pmatrix}1\\\\0\\end{pmatrix}\\right)$</div>'
        },
        {
          num: '5',
          enonce: 'À quelle CNS les matrices $M(a,b) = \\begin{pmatrix}a&b\\\\1&1\\end{pmatrix}$ sont-elles inversibles ?',
          corrige: '<p>$\\det M(a,b) = a\\cdot 1 - b\\cdot 1 = a-b$</p><div class="result-box">$M(a,b)$ inversible $\\Longleftrightarrow a \\neq b$</div>'
        },
        {
          num: '6',
          enonce: 'Calculer le discriminant $\\Delta(a,b)$ du polynôme caractéristique de $M(a,b)$.',
          corrige: '<p>$\\chi_{M(a,b)}(\\lambda) = \\lambda^2-(a+1)\\lambda+(a-b)$, discriminant $= (a+1)^2-4(a-b)$.</p><div class="result-box">$$\\Delta(a,b) = (a-1)^2 + 4b$$</div>'
        },
        {
          num: '7',
          enonce: '(a) Si $\\Delta(a,b)=0$, montrer que $M(a,b)$ n\'est pas diagonalisable dans $\\mathcal{M}_2(\\mathbb{C})$. (b) Si $\\Delta\\neq 0$, $M(a,b)$ est-elle diagonalisable ?',
          corrige: '<p><strong>(a)</strong> VP double $\\lambda_0=\\frac{a+1}{2}$. Diagonalisable nécessiterait $M(a,b)=\\lambda_0 I$, ce qui impose $1=0$ (entrée $(2,1)$). Contradiction ⟹ <strong>non diagonalisable dans $\\mathcal{M}_2(\\mathbb{C})$</strong>.</p><p><strong>(b)</strong> Deux VP distinctes ⟹ diagonalisable.</p><div class="result-box">$\\Delta > 0$ : diagonalisable dans $\\mathcal{M}_2(\\mathbb{R})$ (et $\\mathbb{C}$)<br>$\\Delta < 0$ : diagonalisable dans $\\mathcal{M}_2(\\mathbb{C})$ uniquement</div>'
        },
        {
          num: '8',
          enonce: 'Représenter sur papier millimétré les quatre ensembles et les points $M_1$, $M_2$, $M_3$.',
          corrige: '<p>La frontière $\\Delta=0$ est la parabole $b = -\\dfrac{(a-1)^2}{4}$ (sommet $(1,0)$, orientée vers le bas).</p><ul style="margin:8px 0 8px 16px"><li><strong>Non inversible :</strong> droite $b=a$</li><li><strong>Diag. dans $\\mathbb{R}$ :</strong> $b > -\\frac{(a-1)^2}{4}$ et $a\\neq b$</li><li><strong>Diag. dans $\\mathbb{C}$ seulement :</strong> $b < -\\frac{(a-1)^2}{4}$</li><li><strong>Non diag. dans $\\mathbb{C}$ :</strong> parabole $b=-\\frac{(a-1)^2}{4}$</li></ul><div class="result-box">$M_1(2,6)$ : $\\Delta=25>0$ — diag. $\\mathbb{R}$<br>$M_2(3,-2)$ : $\\Delta=-4<0$ — diag. $\\mathbb{C}$ seulement<br>$M_3(5,-4)$ : $\\Delta=0$ — non diag.</div>'
        }
      ]
    },

    // ── PARTIE B ────────────────────────────────────────────────────────────
    {
      id: 'partieB',
      titre: 'Partie B — Un couple de variables aléatoires',
      points: 25,
      questions: [
        {
          num: 'B1',
          enonce: '(a) Justifier que $CU$ donne la loi de $X$ puis la déterminer. (b) Vérifier $E(X)=V^\\top CU$ et calculer.',
          corrige: '<p><strong>(a)</strong> $(CU)_i = \\sum_j c_{i,j} = \\sum_j P(X=x_i,Y=x_j) = P(X=x_i)$. Calcul : $CU = \\frac{1}{12}\\begin{pmatrix}4\\\\5\\\\3\\end{pmatrix}$</p><div class="result-box">$P(X=-1)=\\tfrac{1}{3}$, $\\quad P(X=0)=\\tfrac{5}{12}$, $\\quad P(X=1)=\\tfrac{1}{4}$</div><p><strong>(b)</strong> $V^\\top CU = \\sum_i x_i P(X=x_i) = (-1)\\cdot\\frac{1}{3}+0+1\\cdot\\frac{1}{4}$</p><div class="result-box">$E(X) = V^\\top CU = -\\dfrac{1}{12}$</div>'
        },
        {
          num: 'B2',
          enonce: 'Produits matriciels pour la loi de $Y$ et $E(Y)$, puis calcul.',
          corrige: '<p>Loi de $Y$ : $U^\\top C$ (sommes colonnes). $E(Y)$ : $U^\\top CV$.</p><p>$U^\\top C = \\frac{1}{12}(4,4,4) = \\big(\\frac{1}{3},\\frac{1}{3},\\frac{1}{3}\\big)$</p><div class="result-box">$P(Y=-1)=P(Y=0)=P(Y=1)=\\dfrac{1}{3}$, $\\quad E(Y) = U^\\top CV = 0$</div>'
        },
        {
          num: 'B3',
          enonce: 'Que représente $V^\\top CV$ ? Calculer.',
          corrige: '<p>$V^\\top CV = \\sum_{i,j} x_i c_{i,j} x_j = E(XY)$. Calcul : $CV = \\frac{1}{12}\\begin{pmatrix}1\\\\-1\\\\0\\end{pmatrix}$, puis $V^\\top(CV) = \\frac{1}{12}(-1+0+0)$.</p><div class="result-box">$V^\\top CV = E(XY) = -\\dfrac{1}{12}$</div>'
        },
        {
          num: 'B4',
          enonce: 'Calculer $\\mathrm{Cov}(X,Y)$.',
          corrige: '<p>$\\mathrm{Cov}(X,Y) = E(XY)-E(X)E(Y) = -\\frac{1}{12} - (-\\frac{1}{12})\\cdot 0$</p><div class="result-box">$\\mathrm{Cov}(X,Y) = -\\dfrac{1}{12}$</div>'
        },
        {
          num: 'B5',
          enonce: '$X$ et $Y$ sont-elles indépendantes ? (deux justifications)',
          corrige: '<p><strong>1.</strong> $\\mathrm{Cov}(X,Y)=-\\frac{1}{12}\\neq 0$ ⟹ non indépendantes.</p><p><strong>2.</strong> $P(X=-1,Y=-1)=\\frac{1}{12}$ mais $P(X=-1)\\cdot P(Y=-1)=\\frac{1}{3}\\cdot\\frac{1}{3}=\\frac{1}{9}\\neq\\frac{1}{12}$.</p><div class="result-box">$X$ et $Y$ ne sont <strong>pas</strong> indépendantes.</div>'
        },
        {
          num: 'B6',
          enonce: 'Que représente $\\mathrm{Tr}(C)$ pour $(X,Y)$ ? Calculer.',
          corrige: '<p>$\\mathrm{Tr}(C) = \\sum_i c_{i,i} = \\sum_i P(X=x_i,Y=x_i) = P(X=Y)$</p><div class="result-box">$\\mathrm{Tr}(C) = \\dfrac{1+2+1}{12} = P(X=Y) = \\dfrac{1}{3}$</div>'
        }
      ]
    },

    // ── PARTIE C ────────────────────────────────────────────────────────────
    {
      id: 'partieC',
      titre: 'Partie C — Des variables aléatoires dans une matrice',
      points: 25,
      questions: [
        {
          num: 'C1',
          enonce: 'Avec $A=X$, $B=Y$ : (a) $P(M(A,B)$ inversible$)$. (b) $P(M(A,B)$ non diagonalisable dans $\\mathcal{M}_2(\\mathbb{R})$ ni $\\mathcal{M}_2(\\mathbb{C}))$.',
          corrige: '<p><strong>(a)</strong> $M(A,B)$ inversible $\\Leftrightarrow A\\neq B$. $P(X=Y)=\\mathrm{Tr}(C)=\\frac{1}{3}$.</p><div class="result-box">$P(\\text{inversible}) = \\dfrac{2}{3}$</div><p><strong>(b)</strong> Non diag. dans $\\mathbb{C}$ $\\Leftrightarrow\\Delta(A,B)=0\\Leftrightarrow(A-1)^2+4B=0$. Paires solutions parmi $(x_i,x_j)$ : $(-1,-1)$ et $(1,0)$.</p><div class="result-box">$P = c_{1,1}+c_{3,2} = \\dfrac{1}{12}+\\dfrac{1}{12} = \\dfrac{1}{6}$</div>'
        },
        {
          num: 'C2',
          enonce: '$A,B$ à valeurs dans $H\\subset\\mathbb{N}$, indépendantes. Établir $P(A=B)=\\sum_{k\\in H}P(A=k)P(B=k)$.',
          corrige: '<p>Partition de $\\lbrace A=B\\rbrace$ par les événements $\\lbrace A=k\\rbrace$ pour $k\\in H$, puis indépendance :</p><div class="result-box">$P(A=B) = \\displaystyle\\sum_{k\\in H}P(A=k,B=k) = \\sum_{k\\in H}P(A=k)P(B=k)$</div>'
        },
        {
          num: 'C3',
          enonce: '$A\\sim\\mathcal{B}(n,p)$, $B\\sim\\mathcal{G}(r)$ indépendantes. (a)–(c) Rappels puis montrer $P(\\text{non inv.}) = \\frac{r}{1-r}\\left[(1-pr)^n-(1-p)^n\\right]$.',
          corrige: '<p>(a) $A(\\Omega)=\\lbrace 0,\\ldots,n\\rbrace$, $P(A=k)=\\binom{n}{k}p^k(1-p)^{n-k}$</p><p>(b) $B(\\Omega)=\\mathbb{N}^*$, $P(B=k)=(1-r)^{k-1}r$</p><p>(c) $P(A=B) = \\sum_{k=1}^{n}\\binom{n}{k}p^k(1-p)^{n-k}(1-r)^{k-1}r = \\frac{r}{1-r}\\sum_{k=1}^{n}\\binom{n}{k}(p(1-r))^k(1-p)^{n-k}$</p><p>$= \\frac{r}{1-r}\\left[(1-p+p(1-r))^n-(1-p)^n\\right]$</p><div class="result-box">$P(\\text{non inversible}) = \\dfrac{r}{1-r}\\left[(1-pr)^n-(1-p)^n\\right]$</div>'
        },
        {
          num: 'C4',
          enonce: '$A\\sim\\mathcal{P}(\\lambda)$, $C=-B\\sim\\mathcal{P}(\\mu)$. (a) Rappel. (b) $A+C\\sim\\mathcal{P}(\\lambda+\\mu)$ via fonctions génératrices. (c) $P(M(A,B)$ inversible$)$.',
          corrige: '<p>(a) $A(\\Omega)=\\mathbb{N}$, $P(A=k)=e^{-\\lambda}\\frac{\\lambda^k}{k!}$</p><p>(b) $G_{A+C}(t)=e^{\\lambda(t-1)}\\cdot e^{\\mu(t-1)}=e^{(\\lambda+\\mu)(t-1)}$ ⟹ $A+C\\sim\\mathcal{P}(\\lambda+\\mu)$.</p><p>(c) Non inv. $\\Leftrightarrow A=B \\Leftrightarrow A-B=0 \\Leftrightarrow A+C=0$. $P(A+C=0)=e^{-(\\lambda+\\mu)}$.</p><div class="result-box">$P(\\text{inversible}) = 1-e^{-(\\lambda+\\mu)}$</div>'
        },
        {
          num: 'C5',
          enonce: '$A\\sim\\mathcal{P}(\\lambda)$, $B\\sim\\mathcal{P}(\\mu)$ indépendantes. Montrer $P(\\text{non inv.}) = I = \\sum_{k=0}^{+\\infty}\\frac{(\\lambda\\mu)^k}{(k!)^2}e^{-(\\lambda+\\mu)}$.',
          corrige: '<p>$P(A=B) = \\sum_{k=0}^{+\\infty}P(A=k)P(B=k) = \\sum_{k=0}^{+\\infty}e^{-\\lambda}\\frac{\\lambda^k}{k!}\\cdot e^{-\\mu}\\frac{\\mu^k}{k!}$</p><div class="result-box">$I = e^{-(\\lambda+\\mu)}\\displaystyle\\sum_{k=0}^{+\\infty}\\frac{(\\lambda\\mu)^k}{(k!)^2}$</div>'
        },
        {
          num: 'C6',
          enonce: '(a) Majorer $|R_n|$. (b) Écrire <code>val_app(eps)</code> en Python. (c) Instruction pour $10^{-5}$.',
          corrige: '<p><strong>(a)</strong> Pour $k\\geq n+1$ : $k!\\geq(n+1)!$ donc $(k!)^2\\geq(n+1)!\\cdot k!$, d\'où :</p><p>$|R_n|\\leq\\frac{e^{-(\\lambda+\\mu)}}{(n+1)!}\\sum_{k=n+1}^{+\\infty}\\frac{(\\lambda\\mu)^k}{k!}\\leq\\frac{e^{-(\\lambda+\\mu)}}{(n+1)!}\\cdot e^{\\lambda\\mu}$</p><div class="result-box">$|R_n|\\leq\\dfrac{1}{(n+1)!}\\,e^{\\lambda\\mu-(\\lambda+\\mu)}$</div><p><strong>(b)</strong></p><pre class="code-block">from math import exp, factorial\n\ndef val_app(eps):\n    n = 0\n    terme = exp(-(la + mu))        # terme k=0\n    somme = terme\n    while exp(la*mu - (la+mu)) / factorial(n+1) >= eps:\n        n += 1\n        terme *= (la * mu) / n**2  # passage k-1 -> k\n        somme += terme\n    return somme</pre><p><strong>(c)</strong> <code>print(val_app(1e-5))</code></p>'
        },
        {
          num: 'C7',
          enonce: '(a–f) Loi de $J_i$, loi de $K_N$, moments de $\\overline{K_N}$, inégalité de Bienaymé-Tchebychev, intervalle de confiance, application numérique ($\\lambda=1$, $\\mu=2$, $N=10^5$, $K_N=21\\,357$).',
          corrige: '<p>(a) $J_i\\sim\\mathcal{B}(I)$ (Bernoulli de paramètre $I$)</p><p>(b) $K_N=\\sum_{i=1}^N J_i\\sim\\mathcal{B}(N,I)$ (somme de $N$ Bernoulli i.i.d.)</p><p>(c) $E(\\overline{K_N})=I$, $\\mathrm{Var}(\\overline{K_N})=\\frac{I(1-I)}{N}\\leq\\frac{1}{4N}$</p><p>(d) Bienaymé-Tchebychev : $P\\!\\left(|\\overline{K_N}-I|\\geq\\varepsilon\\right)\\leq\\frac{\\mathrm{Var}(\\overline{K_N})}{\\varepsilon^2}\\leq\\dfrac{1}{4N\\varepsilon^2}$</p><p>(e) Par complémentaire : $P\\!\\left(I\\in[\\overline{K_N}-\\varepsilon\\,;\\,\\overline{K_N}+\\varepsilon]\\right)\\geq 1-\\dfrac{1}{4N\\varepsilon^2}$</p><p>(f) $\\overline{K_N}=0{,}21357$.</p><ul style="margin:6px 0 6px 16px"><li>$\\varepsilon=10^{-2}$ : $I\\in[0{,}2036\\,;\\,0{,}2236]$ avec proba $\\geq 1-\\frac{1}{40}=97{,}5\\%$</li><li>$\\varepsilon=10^{-3}$ : borne $1-\\frac{1}{4\\times10^5\\times10^{-6}}=1-2{,}5 < 0$ ⟹ <strong>aucune information</strong></li></ul>'
        }
      ]
    },

    // ── PARTIE D ────────────────────────────────────────────────────────────
    {
      id: 'partieD',
      titre: 'Partie D — Un deuxième couple de variables aléatoires',
      points: 10,
      questions: [
        {
          num: 'D1',
          enonce: '(a) Si $X,Y$ indépendantes et $P(X=x_i)\\neq 0$, justifier $\\mathrm{rg}(Q)=1$. (b) VP de $Q$. (c) $Q$ diagonalisable. (d) Contre-exemple pour $n=4$.',
          corrige: '<p>(a) $q_{i,j}=P(X=x_i)P(Y=y_j)=p_i r_j$ ⟹ $Q=\\mathbf{p}\\,\\mathbf{r}^\\top$, matrice de rang 1.</p><p>(b) 0 est VP de mult. alg. $n-1$ ; unique VP non nulle $\\lambda=\\mathrm{Tr}(Q)=\\sum_i p_i r_i > 0$.</p><p>(c) dim $\\ker Q = n-1$ (mult. géom. de 0) + dim $\\ker(Q-\\lambda I)=1$ ⟹ somme $=n$ ⟹ diagonalisable.</p><p>(d) Prendre $P(X=x_3)=P(X=x_4)=0$, $P(Y=y_1)=P(Y=y_2)=0$. Alors $Q=\\mathbf{p}\\mathbf{r}^\\top$ avec $\\mathbf{r}^\\top\\mathbf{p}=0$, donc $Q^2=0$ : seule VP est 0, mult. alg. 4 mais géom. 3 ⟹ non diagonalisable.</p>'
        },
        {
          num: 'D2',
          enonce: 'Si $\\mathrm{rg}(Q)=1$, démontrer que $X$ et $Y$ sont indépendantes.',
          corrige: '<p>$\\mathrm{rg}(Q)=1 \\Rightarrow Q=\\mathbf{u}\\,\\mathbf{v}^\\top$, d\'où $q_{i,j}=u_i v_j$.</p><p>Marginales : $P(X=x_i)=u_i\\cdot\\underbrace{\\sum_j v_j}_{s}$, $P(Y=y_j)=v_j\\cdot\\underbrace{\\sum_i u_i}_{t}$ avec $st=1$ (normalisation).</p><div class="result-box">$P(X=x_i)P(Y=y_j) = (u_i s)(v_j t) = u_i v_j \\cdot st = q_{i,j} = P(X=x_i,Y=y_j)$ ⟹ indépendance</div>'
        }
      ]
    }
  ];
}());
