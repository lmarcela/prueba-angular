import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap } from 'rxjs';
import { IUser } from 'src/app/models/User';
import { PaisesService } from 'src/app/services/paises.service';
import { UsersState } from 'src/app/state/users/users.state';
import { ADD_USER } from '../../../state/users/users.actions';

interface PaisesResponse {
  country: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  users$: Observable<any>;
  breakpoint!: number;
  paisesError = false;
  ciudadesError = false;
  cargando = false;
  paises: string[] = [];
  ciudades: [] = [];
  parentescos = ['Esposo(a)', 'Papá', 'Mamá', 'Hijo(a)', 'Otro'];

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: [{ value: '35', disabled: true }, [Validators.required]],
    pais: ['', Validators.required],
    ciudad: ['', Validators.required],

    personas: this.fb.array([]),
    nuevaPersona: this.fb.group({
      nombreCompleto: [''],
      parentesco: [''],
      edad2: [{ value: '18', disabled: true }, [Validators.required]],
    }),
  });

  get personasArr() {
    return this.miFormulario.get('personas') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesService,
    private store: Store<UsersState>
  ) {
    this.users$ = store.select('users');
  }
  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
    this.loadPaises();
    this.loadCiudades();
  }
  handleSize(event: UIEvent | any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }
  loadPaises() {
    this.paisesService
      .getPaises()
      .subscribe((response: PaisesResponse[] | string) => {
        if (typeof response === 'string') {
          return (this.paisesError = true);
        }
        return (this.paises = response.map(
          (pais: PaisesResponse) => pais.country
        ));
      });
  }
  loadCiudades() {
    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => {
          this.prepararCiudades();
        }),
        switchMap((pais) => {
          return this.paisesService.getCities(pais);
        })
      )
      .subscribe((response: [] | string) => {
        if (typeof response === 'string') {
          this.cargando = false;
          this.ciudades = [];
          this.ciudadesError = true;
          return;
        }
        this.cargando = false;
        this.ciudades = response;
      });
  }
  prepararCiudades() {
    this.ciudadesError = false;
    this.miFormulario.get('ciudad')?.reset('');
    this.cargando = true;
    this.ciudades = [];
  }

  validPersonas() {
    const nombreCompleto = this.miFormulario
      .get('nuevaPersona')
      ?.get('nombreCompleto')?.value;
    const parentesco = this.miFormulario
      .get('nuevaPersona')
      ?.get('parentesco')?.value;
    if (nombreCompleto == null || nombreCompleto.trim() == '') {
      return false;
    }
    if (parentesco == null || parentesco.trim() == '') {
      return false;
    }
    return true;
  }
  agregarPersona() {
    if (this.miFormulario.get('nuevaPersona')?.invalid) {
      return;
    }
    this.personasArr.push(
      new FormControl(
        {
          nombreCompleto: this.miFormulario
            .get('nuevaPersona')
            ?.get('nombreCompleto')?.value,
          parentesco: this.miFormulario.get('nuevaPersona')?.get('parentesco')
            ?.value,
          edad2:
            this.miFormulario.get('nuevaPersona')?.get('edad2')?.value || 18,
        },
        Validators.required
      )
    );
    this.validateParentescos();
    this.miFormulario.get('nuevaPersona')?.reset({
      parentesco: '',
      edad2: '18',
    });
  }
  validateParentescos() {
    this.validateParentesco('papá');
    this.validateParentesco('mamá');
    this.validateParentesco('esposo(a)');
  }
  borrarPersona(i: number) {
    const parentesco = this.personasArr.value[i].parentesco;
    if (
      parentesco === 'papá' ||
      parentesco === 'mamá' ||
      parentesco === 'esposo(a)'
    ) {
      this.parentescos.push(
        parentesco[0].toUpperCase() + parentesco.substring(1)
      );
    }
    this.personasArr.removeAt(i);
  }

  submitFormulario() {
    this.miFormulario.markAllAsTouched();
    console.log(this.miFormulario.value);
    const pais = this.miFormulario.get('pais')?.value;
    const ciudad = this.miFormulario.get('ciudad')?.value;
    console.log('nombre:', this.miFormulario.get('nombre')?.value);
    console.log('apellido:', this.miFormulario.get('apellido')?.value);
    console.log('edad:', this.miFormulario.get('edad')?.value || 18);
    console.log('pais:', pais);
    console.log('ciudad:', ciudad);
    console.log('personas a cargo:', this.miFormulario.get('personas')?.value);
    const user: IUser = {
      nombre: this.miFormulario.get('nombre')?.value,
      apellido: this.miFormulario.get('apellido')?.value,
      edad: this.miFormulario.get('edad')?.value || 18,
      pais,
      ciudad,
      dependientes: this.miFormulario.get('personas')?.value,
    };
    this.store.dispatch(ADD_USER({ payload: user }));
    this.personasArr.clear();
    this.parentescos = ['Esposo(a)', 'Papá', 'Mamá', 'Hijo(a)', 'Otro'];
    this.miFormulario.reset({
      nombre: '',
      apellido: '',
      edad: '35',
      pais,
      ciudad,
      personas: [],
      nuevaPersona: {
        parentesco: '',
        edad2: '18',
      },
    });
  }

  validateParentesco(parentesco: string) {
    if (
      this.personasArr.value.some(
        (x: { parentesco: string }) => x.parentesco === parentesco
      )
    ) {
      this.parentescos = this.parentescos.filter(
        (x) => x.toLowerCase() !== parentesco
      );
    }
  }
}
