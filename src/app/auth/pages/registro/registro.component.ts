import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  paisesError = false;
  ciudadesError = false;

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: [{ value: '', disabled: true }, [Validators.required]],
    pais: ['', Validators.required],
    ciudad: ['', Validators.required],

    personas: this.fb.array([]),
    nuevaPersona: this.fb.group({
      nombreCompleto: [''],
      parentesco: [''],
      edad2: [{ value: '', disabled: true }, [Validators.required]],
    }),
  });
  get personasArr() {
    return this.miFormulario.get('personas') as FormArray;
  }

  cargando = false;
  paises: [] = [];
  ciudades: [] = [];
  parentescos = ['Esposo(a)', 'Papá', 'Mamá', 'Hijo(a)', 'Otro'];

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}
  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: '',
      apellido: '',
      edad: '35',
      pais: '',
      ciudad: '',
      nuevaPersona: {
        parentesco: '',
        edad2: '18',
      },
    });

    this.paisesService
      .getPaises()
      .pipe(
        map((data: any) => data.data),
        catchError(() => {
          this.paisesError = true;
          return of();
        })
      )
      .subscribe((paises) => {
        return (this.paises = paises.map(
          (data: { country: any }) => data.country
        ));
      });

    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap((_) => {
          this.ciudadesError = false;
          this.miFormulario.get('ciudad')?.reset('');
          this.cargando = true;
          this.ciudades = [];
        }),
        switchMap((pais) => {
          return this.paisesService.getCities(pais).pipe(
            catchError(() => {
              this.cargando = false;
              this.ciudades = [];
              this.ciudadesError = true;
              return of();
            })
          );
        }),
        map((data: any) => data.data)
      )
      .subscribe((ciudades) => {
        this.cargando = false;
        this.ciudades = ciudades;
      });
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
    this.miFormulario.get('nuevaPersona')?.disable();
    console.log(this.miFormulario.value);
    const pais = this.miFormulario.get('pais')?.value;
    const ciudad = this.miFormulario.get('ciudad')?.value;
    console.log('nombre:', this.miFormulario.get('nombre')?.value);
    console.log('apellido:', this.miFormulario.get('apellido')?.value);
    console.log('edad:', this.miFormulario.get('edad')?.value || 18);
    console.log('pais:', pais);
    console.log('ciudad:', ciudad);
    console.log('personas a cargo:', this.miFormulario.get('personas')?.value);

    this.miFormulario.get('nuevaPersona')?.enable();

    this.miFormulario.reset({
      nombre: '',
      apellido: '',
      edad: '35',
      pais,
      ciudad,
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
